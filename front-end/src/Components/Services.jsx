import React from "react";
import "./Services.css";
import image17 from "../Images/image17.jpeg";
import image7 from "../Images/image7.jpeg";
import image10 from "../Images/image10.jpeg";
import image24 from "../Images/image24.jpg";
import image21 from "../Images/image21.jpeg";
import image25 from "../Images/image25.jpg";
import image26 from "../Images/image26.jpeg";
import image8 from "../Images/image8.jpeg";
import image9 from "../Images/image9.jpeg";


const Services = () => {

  return (

    <div className="services">

      <h2>Our Services</h2>

      <div className="cardContainer">

        <div className="card">
          <img src={image17} alt="Wedding Events" />
          <h3>Wedding Planning</h3>
        </div>

        <div className="card">
          <img src={image7} alt="Birthday Party" />
          <h3>Birthday Party Management</h3>
        </div>

        <div className="card">
          <img src={image10} alt="Concert" />
          <h3>Music Concerts</h3>
        </div>

        <div className="card">
          <img src={image24} alt="Corporate Event" />
          <h3>Corporate Events</h3>
        </div>

        <div className="card">
          <img src={image21} alt="Catering" />
          <h3>Catering Services</h3>
        </div>

        <div className="card">
          <img src={image25} alt="Photography" />
          <h3>Photography & Videography</h3>
        </div>

        <div className="card">
          <img src={image26} alt="Decoration" />
          <h3>Stage & Decoration Setup</h3>
        </div>

        <div className="card">
          <img src={image8} alt="Lighting" />
          <h3>Sound & Lighting</h3>
        </div>
         <div className="card">
          <img src={image9} alt="Lighting" />
          <h3>College Events</h3>
        </div>

      </div>

    </div>

  );
};

export default Services;