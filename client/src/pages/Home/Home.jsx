import React from "react";
import { FaUserTie, FaCertificate, FaGlobeAmericas } from "react-icons/fa";
import { Md3P, MdArrowOutward } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

import herobg from "../../assets/homehero.png";
import "./style.css";

import p1 from "../../assets/6 ft Offshore Mini Container - 01.png";
import p2 from "../../assets/6 ft Offshore Mini Shelved Container - 01.png";
import p3 from "../../assets/10 ft DNV CSC Offshore Container - 01.png";
import p4 from "../../assets/20 ft DNV CSC Offshore Container - 01.png";

import i1 from "../../assets/oil&gas.png";
import i2 from "../../assets/shipping.png";
import i3 from "../../assets/renewable.png";
import i4 from "../../assets/naval.png";

import earth from "../../assets/earthbg.png";
const Home = () => {
  const industries = [
    { image: i1, label: "Oil & Gas Offshore" },
    { image: i2, label: "Shipping Containers" },
    { image: i3, label: "Renewable Energy" },
    { image: i4, label: "Naval & Defense Sectors" },
  ];
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
      <section className="popular-section">
        <div className="section-heading">
          <h4>
            <span className="orange">#</span>OUR MOST POPULAR SOLUTIONS
          </h4>
        </div>

        <div className="product-cards">
          <div className="product-card">
            <div className="card-image-wrapper">
              <h1 className="card-number">01</h1>
              <img
                src={p1}
                alt="Offshore Container"
                className="product-image"
              />
              <div className="card-caption">MINI OFFSHORE CONTAINER</div>
            </div>
          </div>

          <div className="product-card">
            <div className="card-image-wrapper">
              <h1 className="card-number">02</h1>
              <img
                src={p2}
                alt="Offshore Waste Skip"
                className="product-image"
              />
              <div className="card-caption">
                MINI SHELVED OFFSHORE CONTAINER
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="card-image-wrapper">
              <h1 className="card-number">03</h1>
              <img
                src={p3}
                alt="Offshore Half Height Basket"
                className="product-image"
              />
              <div className="card-caption">DNV CSC OFFSHORE CONTAINER</div>
            </div>
          </div>
        </div>

        <button className="hero-button">Explore All Products</button>
      </section>

      <section className="since-section">
        <div className="since-heading">since 1962</div>

        <div className="since-content">
          <div className="arrow-icon">
            <MdArrowOutward />
          </div>

          <div className="since-text">
            <h5 className="tag">
              <span className="orange">#</span>ABOUT QUICKFIT
            </h5>
            <h2 className="headline">We work for you since 1962</h2>
            <p className="description">
              Quickfit is a global manufacturer specializing in offshore
              containers, skid-mounted modules, and engineered equipment
              designed for the world’s toughest environments. Since 1962, we’ve
              delivered high-performance solutions for energy, marine, and
              industrial sectors.
            </p>
            <button className="hero-button">More About Quickfit</button>
          </div>
        </div>
      </section>
      <section className="global-reach">
        <div className="overlay">
          <h2 className="subtitle">
            <span className="orange">#</span>OUR GLOBAL REACH
          </h2>
          <h1 className="title">Worldwide Manufacturing, Delivery & Support</h1>

          <div className="stats">
            <div className="stat-box">
              <h3 className="stat-number">10K+</h3>
              <p className="stat-label">Units</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">70+</h3>
              <p className="stat-label">Countries</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">300+</h3>
              <p className="stat-label">Clients</p>
            </div>
          </div>
        </div>
        <img className="background-map" src={earth} alt="Global Map" />
      </section>

      <section className="industries">
        <h4 className="subtitle">#INDUSTRIES WE SERVE</h4>
        <h2 className="title">Engineered Solutions for Every Sector</h2>

        <div className="industry-grid">
          {industries.map((industry, index) => (
            <div className="industry-card" key={index}>
              <div className="image-container">
                <img src={industry.image} alt={industry.label} />
                <div className="icon-overlay">
                  <FaArrowRightLong className="icon" />
                </div>
              </div>
              <h3 className="label">{industry.label}</h3>
              <div className="underline"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
