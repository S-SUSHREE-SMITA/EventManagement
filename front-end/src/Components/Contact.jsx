import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>

      <div className="container">
        <div className="row contact-boxes">
          <div className="col-md-4">
            <div className="box">
              <h3>Address</h3>
              <p>Any where, Any City, 4521</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="box">
              <h3>Call Us</h3>
              <p>Call Us: +91 82603-90278</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="box">
              <h3>Mail Us</h3>
              <p>event123@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Map + Form */}
        <div className="row contact-main">
          {/* Map */}
          <div className="col-md-6">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4311742.105329857!2d89.1494263680411!3d18.259714992378935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1773378831167!5m2!1sen!2sin"
                width="400"
                height="300"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="col-md-6">
            <h2 className="contact-title">CONTACT</h2>

            <form>
              <div className="row">
                <div className="col-md-6">
                  <input type="text" placeholder="Name" />
                </div>

                <div className="col-md-6">
                  <input type="email" placeholder="E-mail" />
                </div>
              </div>

              <input type="text" placeholder="Subject" />

              <textarea placeholder="Message"></textarea>

              <button className="send-btn">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
