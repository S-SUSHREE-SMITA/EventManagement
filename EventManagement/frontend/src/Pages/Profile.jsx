import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const { user, token, login, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", address: user?.address || "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeTab === "bookings") fetchBookings();
  }, [activeTab]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put("http://localhost:5000/api/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      login(res.data, token);
      toast.success("Profile updated!");
      setEditMode(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const statusColor = (s) => ({ confirmed: "#16a34a", pending: "#d97706", cancelled: "#dc2626", completed: "#2563eb" }[s] || "#666");

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="avatar-section">
            <div className="big-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <span className="role-badge">{user?.role === "admin" ? "👑 Admin" : "👤 Member"}</span>
          </div>
          <nav className="profile-nav">
            <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
              <span>👤</span> My Profile
            </button>
            <button className={activeTab === "bookings" ? "active" : ""} onClick={() => setActiveTab("bookings")}>
              <span>📋</span> My Bookings
            </button>
            {user?.role === "admin" && (
              <button onClick={() => navigate("/admin/dashboard")}>
                <span>📊</span> Admin Dashboard
              </button>
            )}
            <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
              <span>🚪</span> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="profile-content">
              <div className="content-header">
                <h2>My Profile</h2>
                {!editMode && (
                  <button className="edit-btn" onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
                )}
              </div>

              {!editMode ? (
                <div className="profile-details">
                  <div className="detail-card">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <span>Full Name</span>
                        <strong>{user?.name}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Email Address</span>
                        <strong>{user?.email}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Phone Number</span>
                        <strong>{user?.phone || "Not provided"}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Address</span>
                        <strong>{user?.address || "Not provided"}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Account Role</span>
                        <strong>{user?.role === "admin" ? "Administrator" : "Regular User"}</strong>
                      </div>
                      <div className="detail-item">
                        <span>Member Since</span>
                        <strong>{new Date().getFullYear()}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="edit-form">
                  <div className="field-group">
                    <label>Full Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label>Phone Number</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                  </div>
                  <div className="field-group">
                    <label>Address</label>
                    <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your city / address" />
                  </div>
                  <div className="edit-actions">
                    <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                    <button className="save-btn" onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === "bookings" && (
            <div className="bookings-content">
              <div className="content-header">
                <h2>My Bookings</h2>
                <span className="booking-count">{bookings.length} total</span>
              </div>

              {loadingBookings ? (
                <div className="loading-state">
                  <div className="spinner" />
                  <p>Loading bookings...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>No bookings yet</h3>
                  <p>Your confirmed bookings will appear here.</p>
                  <button onClick={() => navigate("/#services")} className="explore-btn">Explore Services</button>
                </div>
              ) : (
                <div className="bookings-list">
                  {bookings.map((b) => (
                    <div key={b._id} className="booking-card">
                      <div className="booking-header">
                        <div>
                          <h4>{b.serviceType}</h4>
                          <p className="venue-name">{b.venueName} • {b.venueLocation}</p>
                        </div>
                        <div className="booking-badges">
                          <span className="status-badge" style={{ background: statusColor(b.bookingStatus) + "20", color: statusColor(b.bookingStatus), border: `1px solid ${statusColor(b.bookingStatus)}40` }}>
                            {b.bookingStatus.charAt(0).toUpperCase() + b.bookingStatus.slice(1)}
                          </span>
                          <span className={`pay-badge ${b.paymentStatus === "paid" ? "paid" : "unpaid"}`}>
                            {b.paymentStatus === "paid" ? "✓ Paid" : b.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div className="booking-meta">
                        <div><span>📅 Date</span><strong>{new Date(b.eventDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</strong></div>
                        <div><span>🕐 Time</span><strong>{b.eventTime}</strong></div>
                        <div><span>👥 Guests</span><strong>{b.guestCount}</strong></div>
                        <div><span>💰 Amount</span><strong>₹{b.totalAmount?.toLocaleString()}</strong></div>
                      </div>
                      {b.specialRequests && (
                        <div className="special-req">
                          <span>📝 Special Requests:</span> {b.specialRequests}
                        </div>
                      )}
                      <div className="booking-id">
                        Booking ID: <code>{b._id.slice(-8).toUpperCase()}</code>
                        {b.paymentId && <> • Payment: <code>{b.paymentId}</code></>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
