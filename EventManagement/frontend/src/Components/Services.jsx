import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { servicesData } from "../utils/servicesData";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleServiceClick = (slug) => {
    if (!user) {
      navigate("/login", { state: { from: `/services/${slug}` } });
    } else {
      navigate(`/services/${slug}`);
    }
  };

  return (
    <div className="services-section">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">
        Choose from our wide range of professional event management services
      </p>
      <div className="services-grid">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => handleServiceClick(service.slug)}
          >
            <div className="service-img-wrap">
              <img src={service.image} alt={service.title} />
              <div className="service-overlay">
                <span>View Venues →</span>
              </div>
            </div>
            <div className="service-info">
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
