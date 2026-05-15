import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { servicesData } from "../utils/servicesData";
import { toast } from "react-toastify";
import "./BookingPage.css";

const BookingPage = () => {
  const { serviceSlug, venueId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const service = servicesData.find((s) => s.slug === serviceSlug);
  const venue = service?.venues.find((v) => v.id === venueId);

  const [form, setForm] = useState({
    userName: user?.name || "",
    userEmail: user?.email || "",
    userPhone: user?.phone || "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = form, 2 = summary

  if (!service || !venue) {
    return <div className="not-found"><h2>Venue not found.</h2><button onClick={() => navigate("/")}>← Home</button></div>;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProceed = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const bookingData = {
    userName: form.userName,
    userEmail: form.userEmail,
    userPhone: form.userPhone,
    serviceType: service.title,
    venueName: venue.name,
    venueLocation: venue.location,
    venueCapacity: venue.capacity,
    eventDate: form.eventDate,
    eventTime: form.eventTime,
    guestCount: parseInt(form.guestCount),
    specialRequests: form.specialRequests,
    totalAmount: venue.price,
  };

  const confirmDemoBooking = async (orderId) => {
    await axios.post(
      "http://localhost:5000/api/bookings/verify-payment",
      {
        razorpay_order_id: orderId,
        razorpay_payment_id: "DEMO_PAY_" + Date.now(),
        razorpay_signature: "",
        bookingData,
        demo: true,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Booking Confirmed! Check your profile for details.");
    navigate("/profile?tab=bookings");
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderRes = await axios.post(
        "http://localhost:5000/api/bookings/create-order",
        { amount: venue.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, amount, currency, demo } = orderRes.data;

      // ── DEMO MODE (no Razorpay keys configured) ──────────────────────────
      if (demo) {
        await confirmDemoBooking(orderId);
        return;
      }

      // ── LIVE MODE ─────────────────────────────────────────────────────────
      const loaded = await loadRazorpay();
      if (!loaded) { toast.error("Razorpay failed to load."); setLoading(false); return; }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "EventHub",
        description: `${service.title} - ${venue.name}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await axios.post(
              "http://localhost:5000/api/bookings/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData,
                demo: false,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Booking Confirmed! Check your profile for details.");
            navigate("/profile?tab=bookings");
          } catch {
            toast.error("Payment verification failed.");
          }
        },
        prefill: { name: form.userName, email: form.userEmail, contact: form.userPhone },
        theme: { color: "#c8102e" },
        modal: { ondismiss: () => { setLoading(false); toast.info("Payment cancelled."); } },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Could not initiate payment. " + (err.response?.data?.message || "Try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* LEFT: Summary Card */}
        <div className="booking-summary-card">
          <img src={venue.image} alt={venue.name} />
          <div className="summary-info">
            <span className="service-badge">{service.icon} {service.title}</span>
            <h2>{venue.name}</h2>
            <p>📍 {venue.location}</p>
            <p>👥 Up to {venue.capacity.toLocaleString()} guests</p>
            <div className="amenities-summary">
              {venue.amenities.map(a => <span key={a}>{a}</span>)}
            </div>
            <div className="price-box">
              <span>Total Amount</span>
              <strong>₹{venue.price.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="booking-form-area">
          {/* Progress Steps */}
          <div className="steps">
            <div className={`step ${step >= 1 ? "active" : ""}`}><span>1</span> Event Details</div>
            <div className="step-line" />
            <div className={`step ${step >= 2 ? "active" : ""}`}><span>2</span> Review & Pay</div>
          </div>

          {step === 1 && (
            <form onSubmit={handleProceed} className="booking-form">
              <h3>Your Details</h3>

              <div className="form-row-2">
                <div className="field">
                  <label>Full Name *</label>
                  <input name="userName" value={form.userName} onChange={handleChange} required placeholder="Your name" />
                </div>
                <div className="field">
                  <label>Email Address *</label>
                  <input name="userEmail" type="email" value={form.userEmail} onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label>Phone Number *</label>
                <input name="userPhone" value={form.userPhone} onChange={handleChange} required placeholder="+91 98765 43210" />
              </div>

              <h3 style={{ marginTop: 24 }}>Event Details</h3>

              <div className="form-row-2">
                <div className="field">
                  <label>Event Date *</label>
                  <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} required />
                </div>
                <div className="field">
                  <label>Event Time *</label>
                  <input name="eventTime" type="time" value={form.eventTime} onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label>Number of Guests *</label>
                <input name="guestCount" type="number" value={form.guestCount} onChange={handleChange}
                  min={1} max={venue.capacity} required placeholder={`Max: ${venue.capacity}`} />
              </div>

              <div className="field">
                <label>Special Requests (Optional)</label>
                <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
                  rows={3} placeholder="Any dietary requirements, theme preferences, etc." />
              </div>

              <button type="submit" className="proceed-btn">Review Booking →</button>
            </form>
          )}

          {step === 2 && (
            <div className="review-section">
              <h3>Review Your Booking</h3>
              <div className="review-grid">
                <div className="review-item"><span>Name</span><strong>{form.userName}</strong></div>
                <div className="review-item"><span>Email</span><strong>{form.userEmail}</strong></div>
                <div className="review-item"><span>Phone</span><strong>{form.userPhone}</strong></div>
                <div className="review-item"><span>Service</span><strong>{service.title}</strong></div>
                <div className="review-item"><span>Venue</span><strong>{venue.name}</strong></div>
                <div className="review-item"><span>Location</span><strong>{venue.location}</strong></div>
                <div className="review-item"><span>Date</span><strong>{new Date(form.eventDate).toLocaleDateString("en-IN", { year:"numeric",month:"long",day:"numeric" })}</strong></div>
                <div className="review-item"><span>Time</span><strong>{form.eventTime}</strong></div>
                <div className="review-item"><span>Guests</span><strong>{form.guestCount}</strong></div>
                {form.specialRequests && <div className="review-item full"><span>Special Requests</span><strong>{form.specialRequests}</strong></div>}
              </div>

              <div className="payment-total">
                <span>Total Payable</span>
                <strong>₹{venue.price.toLocaleString()}</strong>
              </div>

              <div className="review-actions">
                <button className="back-edit-btn" onClick={() => setStep(1)}>← Edit Details</button>
                <button className="pay-btn" onClick={handlePayment} disabled={loading}>
                  {loading ? "Processing..." : `Pay ₹${venue.price.toLocaleString()}`}
                </button>
              </div>

              <p className="secure-note">🔒 Secured by Razorpay. If no keys are configured, booking confirms instantly in demo mode.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
