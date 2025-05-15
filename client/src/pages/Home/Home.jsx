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

import c1 from "../../assets/cert1.png";
import c2 from "../../assets/cert2.png";
import c3 from "../../assets/cert3.png";
import c4 from "../../assets/cert4.png";

import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";

import client1 from "../../assets/client1.png";
import client2 from "../../assets/client2.png";
import client3 from "../../assets/client3.png";
import client4 from "../../assets/client4.png";
import client5 from "../../assets/client5.png";
import client6 from "../../assets/client6.png";
import client7 from "../../assets/client7.png";
import client8 from "../../assets/client8.png";
import client9 from "../../assets/client9.png";

import earth from "../../assets/earthbg.png";
const Home = () => {
  const industries = [
    { image: i1, label: "Oil & Gas Offshore" },
    { image: i2, label: "Shipping Containers" },
    { image: i3, label: "Renewable Energy" },
    { image: i4, label: "Naval & Defense Sectors" },
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

  // Duplicate the list for seamless infinite loop
  const allClients = [...clients, ...clients];

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
        <h4 className="industries-subtitle">
          <span className="orange">#</span>INDUSTRIES WE SERVE
        </h4>
        <h2 className="industries-title">
          Engineered Solutions for Every Sector
        </h2>

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

      <section className="recent-blogs">
        <h2 className="section-title">
          <span className="orange">#</span>RECENT BLOGS
        </h2>

        <div className="blogs-grid">
          {/* Featured Blog */}
          <div className="blog-card featured">
            <img src={blog1} alt="Featured Blog" />
            <div className="blog-info">
              <div className="blog-meta">
                <span className="blog-tag">Industry Updates</span>
                <span className="blog-date">MAR 16, 2025</span>
              </div>
              <h3 className="blog-title">Offshore Container Trends in 2025</h3>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="blog-card">
            <img src={blog2} alt="Blog 2" />
            <div className="blog-info">
              <div className="blog-meta">
                <span className="blog-tag">Industry Updates</span>
                <span className="blog-date">MAR 16, 2025</span>
              </div>
              <h3 className="blog-title">Offshore Container Trends in 2025</h3>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="blog-card">
            <img src={blog3} alt="Blog 3" />
            <div className="blog-info">
              <div className="blog-meta">
                <span className="blog-tag">Safety & Compliance</span>
                <span className="blog-date">MAR 16, 2025</span>
              </div>
              <h3 className="blog-title">DNV 2.7-1 Compliance Made Simple</h3>
            </div>
          </div>
        </div>

        <div className="blog-button">
          <button className="hero-button">Explore All Blogs</button>
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
    </div>
  );
};

export default Home;
