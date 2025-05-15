import React from "react";
import { FaUserTie, FaCertificate, FaGlobeAmericas } from "react-icons/fa";
import herobg from "../../assets/homehero.png";
import "./style.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
          <div className="hero-overlay"></div>
          <img
            src={herobg}
            alt="Container Yard Background"
            className="hero-bg"
            loading="lazy"
          />
          <div className="hero-content">
            <h4>
              <span className="orange">#</span>WELCOME TO QUICKFIT
            </h4>
            <h1>
              Built to Withstand.
              <br />
              Engineered to Deliver.
            </h1>
            <p>
              Premium Offshore Containers & Equipment Trusted by Global
              Industries
            </p>
            <button className="hero-button">Explore Products</button>
          </div>
        </div>

        <div className="hero-card-section">
          <div className="hero-card">
            <FaUserTie className="hero-icon" aria-hidden="true" />
            <h2>50+ Years</h2>
            <p>of Manufacturing Expertise</p>
          </div>
          <div className="hero-card">
            <FaCertificate className="hero-icon" aria-hidden="true" />
            <h2>DNV 2.7-1 / EN 12079</h2>
            <p>Certified Containers</p>
          </div>
          <div className="hero-card">
            <FaGlobeAmericas className="hero-icon" aria-hidden="true" />
            <h2>70+ Countries</h2>
            <p>we have delivered in</p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="why-left">
          <span className="why-subtitle">
            <span className="orange">#</span>WHY CHOOSE QUICKFIT
          </span>
          <h2 className="why-title">
            Custom Solutions for <br />
            Demanding Environments
          </h2>
        </div>
        <div className="why-right">
          <p className="why-description">
            At Quickfit, we go beyond manufacturing – we engineer solutions. Our
            expert services are designed to deliver uncompromising safety,
            efficiency, and innovation in offshore container and machinery
            applications. From design to delivery, we've got you covered.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
