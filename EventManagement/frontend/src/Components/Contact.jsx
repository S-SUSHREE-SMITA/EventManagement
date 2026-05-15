import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-section">
      <h2 className="section-title">Contact Us</h2>
      <div className="contact-grid">
        {/* Info */}
        <div className="contact-info">
          <h3>Get In Touch</h3>
          <p>Have a question or ready to start planning? Reach out to us and our team will respond within 24 hours.</p>
          <div className="info-items">
            <div className="info-item"><span>📍</span><div><strong>Address</strong><p>EventHub HQ, Bhubaneswar, Odisha 751001</p></div></div>
            <div className="info-item"><span>📞</span><div><strong>Phone</strong><p>+91 98765 43210</p></div></div>
            <div className="info-item"><span>✉️</span><div><strong>Email</strong><p>hello@eventhub.in</p></div></div>
            <div className="info-item"><span>🕐</span><div><strong>Hours</strong><p>Mon–Sun: 9AM – 8PM</p></div></div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-box">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your event..." rows={5} required />
            </div>
            <button type="submit" className="btn-primary-custom" style={{width:"100%"}}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
