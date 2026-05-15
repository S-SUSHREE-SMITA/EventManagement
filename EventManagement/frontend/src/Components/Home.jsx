import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";
import home1 from "../Images/home1.jpg";
import home2 from "../Images/home2.jpg";
import home3 from "../Images/home3.jpg";
import home4 from "../Images/home4.jpg";
import home5 from "../Images/home5.jpg";


const slides = [
  { bg: home1, title: "Unforgettable Weddings", sub: "We turn your dream wedding into a beautiful reality" },
  { bg: home2, title: "Memorable Celebrations", sub: "Birthdays, anniversaries & every special moment" },
  { bg: home3, title: "Corporate Events", sub: "Professional events that leave a lasting impression" },
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <div className="hero-carousel">
        <Carousel fade interval={4000}>
          {slides.map((s, i) => (
            <Carousel.Item key={i}>
              <div className="carousel-slide" style={{ backgroundImage: `url(${s.bg})` }}>
                <div className="carousel-overlay">
                  <h1>{s.title}</h1>
                  <p>{s.sub}</p>
                  <a href="#services" className="hero-btn">Explore Services</a>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Stats */}
      <div className="stats-strip">
        <div className="stat"><span className="stat-num">500+</span><span>Events Managed</span></div>
        <div className="stat"><span className="stat-num">50+</span><span>Premium Venues</span></div>
        <div className="stat"><span className="stat-num">10K+</span><span>Happy Clients</span></div>
        <div className="stat"><span className="stat-num">15+</span><span>Years Experience</span></div>
      </div>

      {/* About Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <span className="badge-label">Who We Are</span>
            <h2 className="about-heading">Making Every Event <span>Extraordinary</span></h2>
            <p className="about-text">
              EventHub is your premier partner for creating unforgettable events. From intimate gatherings
              to grand celebrations, our experienced team manages every detail with precision and passion.
            </p>
            <p className="about-text">
              We offer end-to-end event management services including venue selection, catering, decoration,
              entertainment, photography and much more — all under one roof.
            </p>
            <a href="#services" className="btn-primary-custom">Our Services</a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="about-img-grid">
              <img src={home4} alt="event1" />
              <img src={home5} alt="event2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
