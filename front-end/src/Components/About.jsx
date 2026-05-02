import React from "react";
import "./About.css";
import image20 from "../Images/image20.jpeg";

const About = () => {
  return (
    <div className="about">
      <h1>About Our Events</h1>

      <div className="container aboutText">
        <div className="row">
          <div className="col-md-6">
            <p>
              We specialize in creating unforgettable events such as weddings,
              concerts, birthday parties and corporate meetings. Our goal is to
              turn every celebration into a memorable experience.
            </p>

            <p>
              Our professional team manages every aspect of an event including
              planning, decoration, catering and guest management. We focus on
              every small detail to ensure the event runs smoothly.
            </p>

            <p>
              With years of experience in event planning, we understand the
              importance of creativity and organization. We work closely with
              clients to bring their ideas to life and create unique and
              unforgettable moments.
            </p>

            <p>
              Whether it is a small private party or a large corporate event,
              we ensure everything is perfectly arranged and executed with
              professionalism and passion.
            </p>
          </div>

          <div className="col-md-6">
            <img src={image20} className="image20" alt="event" />
          </div>
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="container about-cards">
        <div className="row text-center justify-content-center card-row">
          <div className="col-md-4">
            <div className="card p-4">
              <h3>500+</h3>
              <p>Events Organized</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4">
              <h3>300+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
