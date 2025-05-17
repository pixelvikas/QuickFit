import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "./style.css";
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
                  Guild Street 51, North Town,
                  <br />
                  London-06192, UK
                </p>
              </div>

              <div className="contact-box">
                <h5>Phone Number</h5>
                <p>
                  +1 (888) 123-5678
                  <br />
                  (+44)123 456 789
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
              <button type="submit">Send Message</button>
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
    </>
  );
};

export default Contact;