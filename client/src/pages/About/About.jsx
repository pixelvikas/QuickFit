import React from "react";
import whoarewebg from "../../assets/whoarewe.png";

import aboutbg from "../../assets/aboutbg.png";

import i1 from "../../assets/shipping.png";
import i2 from "../../assets/aboutbg.png";
import i3 from "../../assets/renewable.png";
import i4 from "../../assets/naval.png";

import c1 from "../../assets/cert1.png";
import c2 from "../../assets/cert2.png";
import c3 from "../../assets/cert3.png";
import c4 from "../../assets/cert4.png";

import client1 from "../../assets/client1.png";
import client2 from "../../assets/client2.png";
import client3 from "../../assets/client3.png";
import client4 from "../../assets/client4.png";
import client5 from "../../assets/client5.png";
import client6 from "../../assets/client6.png";
import client7 from "../../assets/client7.png";
import client8 from "../../assets/client8.png";
import client9 from "../../assets/client9.png";
import { FaArrowRightLong } from "react-icons/fa6";
const About = () => {
  const historyData = [
    {
      year: "1962",
      title: "We Have Expert Team",
      description:
        "We've been using My Ocean Logistics for our international shipments, and they never disappoint.",
    },
    {
      year: "1980",
      title: "We Have Expert Team",
      description:
        "We've been using My Ocean Logistics for our international shipments, and they never disappoint.",
    },
    {
      year: "2002",
      title: "We Have Expert Team",
      description:
        "We've been using My Ocean Logistics for our international shipments, and they never disappoint.",
    },
    {
      year: "2011",
      title: "We Have Expert Team",
      description:
        "We've been using My Ocean Logistics for our international shipments, and they never disappoint.",
    },
  ];
  const facilities = [
    { title: "Manufacturing Plants", img: i1 },
    { title: "Quality Labs", img: i2 },
    { title: "R&D Center", img: i3 },
    { title: "Testing Infrastructure", img: i4 },
  ];

  const clients = [
    client1,
    client2,
    client3,
    client4,
    client5,
    client6,
    client7,
    client8,
    client9,
  ];

  const allClients = [...clients, ...clients];

  return (
    <>
      <section className="about-section">
        <div className="about-content">
          <div className="text-section">
            <h1 className="main-heading">Who We Are</h1>
            <p className="description">
              Quickfit is a globally recognized manufacturer of offshore
              containers and specialized machinery. We combine engineering
              innovation with uncompromised safety and precision to deliver
              high-performance solutions across marine and energy sectors.
            </p>

            <div className="sub-section">
              <h2 className="sub-heading">Our Mission</h2>
              <p className="description">
                To engineer reliable and safe offshore solutions that exceed
                global standards and expectations.
              </p>
            </div>

            <div className="sub-section">
              <h2 className="sub-heading">Our Vision</h2>
              <p className="description">
                To be the world’s most trusted provider of offshore container
                and machinery systems.
              </p>
            </div>
          </div>

          <div className="image-section">
            <img src={whoarewebg} alt="Industrial Facility" />
          </div>
        </div>
      </section>
      <section className="since-section">
        <div className="since-container">
          <div className="arrow-icon">
            <FaArrowRightLong />
          </div>
          <h1 className="since-text">since 1962</h1>
        </div>
      </section>

      <section className="progress-section">
        <h4 className="section-tag">
          <span className="orange">#</span>ABOUT QUICKFIT
        </h4>
        <h1 className="section-title">We work for you since 1962</h1>

        <div className="progress-content">
          <div className="progress-image">
            <img src={aboutbg} alt="Quickfit factory" />
          </div>

          <div className="progress-text">
            <p className="progress-description">
              Quickfit is a global manufacturer specializing in offshore
              containers, skid-mounted modules, and engineered equipment
              designed for the world’s toughest environments.
            </p>
            <p className="progress-description">
              Since 1962, we’ve delivered high-performance solutions for energy,
              marine, and industrial sectors.
            </p>

            <div className="progress-group">
              <div className="progress-item">
                <div className="progress-header">
                  <span>Construction</span>
                  <span>65%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-header">
                  <span>Production</span>
                  <span>93%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "93%" }}></div>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-header">
                  <span>Deadline</span>
                  <span>41%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "41%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <h4 className="timeline-tag">
          <span className="orange">#</span>HISTORY
        </h4>
        <h2 className="timeline-title">History of our company</h2>

        <div className="timeline-container">
          {historyData.map((item, index) => (
            <div className="timeline-item" key={index}>
              <h1 className="timeline-year">{item.year}</h1>
              <h3 className="timeline-subtitle">{item.title}</h3>
              <p className="timeline-description">"{item.description}"</p>
              <div className="timeline-marker"></div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>

      <section className="facilities-section">
        <h4 className="facilities-tag">
          <span className="orange">#</span>OUR FACILITIES
        </h4>
        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div className="facility-card" key={index}>
              <img src={facility.img} alt={facility.title} />
              <h3>{facility.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="certifications-section">
        <div className="certifications-container">
          <div className="cert-logos">
            <img src={c1} alt="Certification 1" />
            <img src={c2} alt="Certification 2" />
            <img src={c3} alt="Certification 3" />
            <img src={c4} alt="Certification 4" />
          </div>

          <div className="cert-content">
            <h4 className="cert-subtitle">
              <span className="orange">#</span>OUR CERTIFICATIONS
            </h4>
            <h2 className="cert-title">
              Globally Recognized.
              <br />
              Industry Certified
            </h2>
            <p className="cert-description">
              We adhere to globally recognized certification frameworks to
              guarantee that every unit delivered is engineered with precision,
              tested for excellence, and approved for safety compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="trusted-clients">
        <h2 className="clients-title">
          <span className="orange">#</span>OUR TRUSTED CLIENTS
        </h2>
        <div className="carousel-wrapper">
          <div className="carousel-track">
            {allClients.map((logo, index) => (
              <div className="carousel-item" key={index}>
                <img src={logo} alt={`client-logo-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>
        {`.about-section {
  padding: 40px 20px;
  background-color: #ffffff;
}

.about-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
}

.text-section {
  flex: 1 1 50%;
  max-width: 600px;
}

.image-section {
  display: flex;
  justify-content: center;
}

.image-section img {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
}

.main-heading {
  font-size: 32px;
  background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.sub-heading {
  font-size: 25px;
  color: #1d3557;
  margin-top: 25px;
  margin-bottom: 10px;
}

.description {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }

  .image-section {
    order: -1;
  }

  .text-section,
  .image-section {
    flex: 1 1 100%;
  }
}
.since-section {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.since-container {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  text-align: center;
}

.arrow-icon {
  font-size: 10vw; /* Responsive to screen width */
  color: #ff6f00; /* Bright orange */
  transform: rotate(-40deg); /* Diagonal arrow */
}

.since-text {
  font-size: 10vw; /* Responsive to screen width */
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px #ff6f00;
  text-stroke: 1px #ff6f00;
  text-transform: lowercase;
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Tablet view */
@media (max-width: 1024px) {
  .arrow-icon {
    display: none;
  }

  .arrow-icon,
  .since-text {
    font-size: 8vw;
  }
}

/* Mobile landscape */
@media (max-width: 768px) {
  .arrow-icon,
  .since-text {
    font-size: 12vw;
    -webkit-text-stroke: 1px #ff6f00;
  }
}

/* Mobile portrait */
@media (max-width: 480px) {
  .since-container {
    flex-direction: column;
    gap: 10px;
  }

  .arrow-icon,
  .since-text {
    font-size: 14vw;
  }
}
.progress-section {
  padding: 40px 20px;
  background-color: #fff;
  max-width: 1200px;
  margin: auto;
}

.orange {
  color: #ff4500;
}

.section-tag {
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin: 10px 0 30px;
}

.progress-content {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.progress-image img {
  width: 100%;
  max-width: 550px;
  height: 347px;
  border-radius: 8px;
}

.progress-text {
  flex: 1;
  min-width: 280px;
}

.progress-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
}

.progress-group {
  margin-top: 25px;
}

.progress-item {
  margin-bottom: 20px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #ff6f00;
  transition: width 0.4s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .progress-content {
    flex-direction: column;
  }

  .section-title {
    font-size: 24px;
  }

  .progress-description {
    font-size: 15px;
  }

  .progress-image img {
    height: 200px;
  }
}

.timeline-section {
  padding: 60px 20px;
  text-align: center;
  background-color: #fff;
  position: relative;
}

.timeline-tag {
  font-size: 14px;
  color: #000;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.timeline-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 50px;
  color: #000;
}

.timeline-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  max-width: 1100px;
  margin: auto;
  padding: 0 20px;
}

.timeline-item {
  flex: 1;
  position: relative;
  padding: 0 10px;
  text-align: left;
}

.timeline-year {
  font-size: 4rem;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 1px #ff6f00;
  margin-bottom: 10px;
}

.timeline-subtitle {
  font-size: 16px;
  color: #f1383b;
  font-weight: 600;
  margin-bottom: 8px;
}

.timeline-description {
  font-size: 14px;
  color: #444;
  line-height: 1.6;
}

.timeline-marker {
  width: 14px;
  height: 14px;
  background-color: #ff6f00;
  border-radius: 50%;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.timeline-line {
  position: absolute;
  bottom: -24px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ccc;
  z-index: 1;
  width: 90%;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-container {
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }

  .timeline-line,
  .timeline-marker {
    display: none;
  }

  .timeline-year {
    font-size: 28px;
  }
}

.facilities-section {
  padding: 1rem;
  text-align: center;
  background-color: #fff;
}

.facilities-tag {
  font-size: 14px;
  color: #000;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 30px;
  text-align: left;
  padding-left: 10%;
}

.facilities-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.facility-card {
  width: 220px;
  transition: transform 0.3s ease;
}

.facility-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.facility-card h3 {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #222;
  position: relative;
}

.facility-card:hover {
  transform: translateY(-5px);
}

.facility-card h3::after {
  content: "";
  display: block;
  margin: 4px auto 0;
  width: 40%;
  height: 2px;
  background-color: #e53935;
}

@media (max-width: 768px) {
  .facilities-grid {
    flex-direction: column;
    align-items: center;
  }

  .facility-card {
    width: 80%;
  }
}
`}
      </style>
    </>
  );
};

export default About;
