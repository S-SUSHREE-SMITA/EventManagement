import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="row">
          
          <div className="col-md-4">
            <h3>EventHub</h3>
            <p>
              Creating unforgettable events with professionalism and passion.
            </p>
          </div>

         
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4>Contact</h4>
            <p>Any where, Any City, 4521</p>
            <p>+91 82603-90278</p>
            <p>event123@gmail.com</p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12 text-center">
            <p>© 2026 EventMaster. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
