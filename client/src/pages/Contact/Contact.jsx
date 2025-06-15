import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import contactbg from "../../assets/contactbg.png";

const Contact = () => {
  return (
    <>
      <section
        className="contact-section"
        style={{ backgroundImage: `url(${contactbg})` }}
      >
        <div className="contact-content">
          <div className="contact-info">
            <h4>#CONTACT US</h4>
            <h1>
              We are always ready <br />
              to help you and answer <br />
              your questions
            </h1>

            <div className="contact-details">
              <div className="contact-box">
                <h5>Location</h5>
                <p>
                  B 400, Oberoi Garden Business Prewmises, Chandivali Farm Road
                  Andheri East,
                  <br />
                  Mumbai - 400072. Maharashtra. INDIA
                </p>
              </div>

              <div className="contact-box">
                <h5>Phone Number</h5>
                <p>
                  +91 9869908422
                  <br />
                  +92 022-4751-0385
                </p>
              </div>

              <div className="contact-box">
                <h5>Email Address</h5>
                <p>info@example.com</p>
                <p>contact@example.com</p>
              </div>

              <div className="contact-box">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  <a href="#" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="#" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-box">
            <h2>Get in Touch</h2>
            <p>
              Have a question or need a custom solution? <br />
              We're here to help.
            </p>
            <form className="contact-form">
              <input type="text" placeholder="Full name" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Subject" required />
              <textarea placeholder="Message" rows="4" required></textarea>
              <button className="hero-button" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.01900495397!2d72.89144051920519!3d19.105988378318656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c873a1818245%3A0x7423c7dafc5c8e4e!2sQUICK%20FIT%20ENGINEERING%20%26%20FABRICATORS!5e0!3m2!1sen!2sin!4v1747395888091!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="QUICK FIT Engineering & Fabricators - Location Map"
          ></iframe>
        </div>
      </section>

      <style>
        {`
        .contact-section {
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 1rem;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  border-radius: 8px;
  padding: 1rem;
  margin: auto;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}

.contact-info {
  flex: 1;
  max-width: 48%;
}

.contact-info h4 {
  color: #ff5c00;
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
}

.contact-info h1 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.5;
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.contact-box {
  width: 45%;
}

.contact-box h5 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #222;
}

.contact-box p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.social-icons a {
  margin-right: 12px;
  color: #ff5c00;
  font-size: 18px;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #d54400;
}

.contact-form-box {
  flex: 1;
  max-width: 48%;
  background-color: #00214d;
  color: #fff;
  padding: 40px 30px;
  border-radius: 8px;
}

.contact-form-box h2 {
  margin-bottom: 10px;
  font-size: 22px;
}

.contact-form-box p {
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.4;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #666;
}

.contact-form textarea {
  resize: vertical;
}


/* Map Section */
.map-section {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #f9f9f9;
}

.map-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* ------------------ Responsive Design ------------------ */
@media (max-width: 1024px) {
  .contact-info,
  .contact-form-box {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
    padding: 0rem;
    gap: 30px;
  }

  .contact-info h1 {
    font-size: 24px;
  }

  .contact-form-box h2 {
    font-size: 20px;
  }

  .contact-box {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .contact-info h1 {
    font-size: 20px;
  }

  .contact-form input,
  .contact-form textarea {
    font-size: 13px;
    padding: 10px;
  }

 
}
`}
      </style>
    </>
  );
};

export default Contact;
