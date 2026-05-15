import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../utils/servicesData";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="not-found">
        <h2>Service not found</h2>
        <button onClick={() => navigate("/")}>← Back to Home</button>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Hero Banner */}
      <div className="service-hero" style={{ backgroundImage: `url(${service.image})` }}>
        <div className="hero-overlay">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <span className="service-icon-big">{service.icon}</span>
          <h1>{service.title}</h1>
          <p>{service.fullDescription}</p>
        </div>
      </div>

      {/* Venues */}
      <div className="venues-section">
        <div className="container">
          <h2 className="section-title">Available Venues & Packages</h2>
          <p className="section-subtitle">
            Select a venue to proceed with your booking
          </p>

          <div className="venues-grid">
            {service.venues.map((venue) => (
              <div key={venue.id} className="venue-card">
                <div className="venue-img-wrap">
                  <img src={venue.image} alt={venue.name} />
                  {/* <div className="venue-rating">⭐ {venue.rating}</div> */}
                </div>

                <div className="venue-details">
                  <h3>{venue.name}</h3>
                  <p className="venue-location">📍 {venue.location}</p>
                  <p className="venue-capacity">👥 Capacity: Up to {venue.capacity.toLocaleString()} guests</p>

                  <div className="amenities">
                    {venue.amenities.map((a) => (
                      <span key={a} className="amenity-tag">{a}</span>
                    ))}
                  </div>

                  <div className="venue-footer">
                    <div className="venue-price">
                      <span className="price-label">Starting from</span>
                      <span className="price-amount">₹{venue.price.toLocaleString()}</span>
                    </div>
                    <button
                      className="book-btn"
                      onClick={() => navigate(`/booking/${service.slug}/${venue.id}`)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
