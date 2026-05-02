import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

import image16 from "../Images/image16.jpeg";
import image20 from "../Images/image20.jpeg";
import image23 from "../Images/image23.jpeg";
import image15 from "../Images/image15.jpeg";

export default function Home() {
  return (
    <div className="home">
      {/* Carousel */}
      <div className="carousel-wrapper">
        <Carousel>
          <Carousel.Item>
            <img src={image16} className="carouselImg" alt="slide1" />
          </Carousel.Item>

          <Carousel.Item>
            <img src={image20} className="carouselImg" alt="slide2" />
          </Carousel.Item>

          <Carousel.Item>
            <img src={image23} className="carouselImg" alt="slide3" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Text and Image */}
      <div className="container event-section">
        <div className="row">
          <div className="col-md-6">
            <h2>Event Management</h2>

            <p>
              Event management is the process of planning and organizing events
              such as weddings, corporate meetings, birthday parties and
              concerts.
            </p>

            <p>
              Our team ensures every event is perfectly arranged with
              decoration, catering, guest management and entertainment.
            </p>

            <p>
              We work closely with our clients to understand their vision and
              transform it into a memorable experience. From venue selection to
              final execution, our professionals handle every detail with care.
            </p>

            <p>
              Whether it is a small private gathering or a large celebration, we
              make sure your event runs smoothly and becomes an unforgettable
              moment for you and your guests.
            </p>
          </div>

          <div className="col-md-6">
            <img src={image15} className="image8" alt="event" />
          </div>
        </div>
      </div>
    </div>
  );
}
