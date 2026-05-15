import React from "react";
import "./About.css";
import about from "../Images/about.jpg";

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">About Us</h2>

        <div className="about-content">
          <div className="about-text-block">
            <h3>15+ Years of Creating Magic</h3>
            <p>
              EventHub was founded with a single mission: to make every event an extraordinary experience.
              With over 15 years in the industry and 500+ successful events, we have built a reputation
              for excellence, creativity and flawless execution.
            </p>
            <p>
              From intimate family celebrations to grand corporate galas, our team of dedicated professionals
              brings passion and precision to every project. We believe that every event tells a story —
              and we are here to make yours unforgettable.
            </p>

            <div className="about-features">
              {["Professional & Experienced Team", "End-to-End Event Management", "Customized Solutions", "24/7 Support"].map(f => (
                <div key={f} className="feature-item">
                  <span className="check">✓</span> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <img src={about} alt="Event venue" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;