import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <h3>EventHub</h3>
        <p>Creating extraordinary memories through professional event management since 2009.</p>
        <div className="social-links">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="YouTube">▶️</a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <a href="/#home">Home</a>
        <a href="/#services">Services</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </div>

      <div className="footer-col">
        <h4>Services</h4>
        <a href="/#services">Wedding Planning</a>
        <a href="/#services">Birthday Parties</a>
        <a href="/#services">Corporate Events</a>
        <a href="/#services">Music Concerts</a>
      </div>

      <div className="footer-col">
        <h4>Contact</h4>
        <p>📍 Bhubaneswar, Odisha</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ hello@eventhub.in</p>
        <p>🕐 Mon–Sun: 9AM – 8PM</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 EventHub. All rights reserved.</p>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
