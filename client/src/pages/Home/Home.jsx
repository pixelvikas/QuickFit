import React, { useEffect, useState } from "react";
import { FaUserTie, FaCertificate, FaGlobeAmericas } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import herobg1 from "../../assets/herobg1.jpeg";
import herobg2 from "../../assets/herobg2.png";
import herobg3 from "../../assets/herobg3.png";
import herobg4 from "../../assets/herobg4.png";
import herobg5 from "../../assets/herobg5.png";

import i1 from "../../assets/oil&gas.png";
import i2 from "../../assets/shipping.png";
import i3 from "../../assets/renewable.png";
import i4 from "../../assets/naval.png";

import c1 from "../../assets/cert1.png";

import client1 from "../../assets/client1.png";
import client2 from "../../assets/client2.png";
import client3 from "../../assets/client3.png";
import client4 from "../../assets/client4.png";
import client5 from "../../assets/client5.png";
import client6 from "../../assets/client6.png";
import client7 from "../../assets/client7.png";
import client8 from "../../assets/client8.png";
import client9 from "../../assets/client9.png";
import client10 from "../../assets/client10.png";
import client11 from "../../assets/client11.png";
import client12 from "../../assets/client12.png";
import client13 from "../../assets/client13.png";
import client14 from "../../assets/client14.png";
import client15 from "../../assets/client15.png";
import client16 from "../../assets/client16.png";
import client17 from "../../assets/client17.png";
import client18 from "../../assets/client18.png";
import client19 from "../../assets/client19.png";

import productsData from "../../productsData.json";
import blogsData from "../../blogData.json";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import earth from "../../assets/earthbg.png";

const Home = () => {
  const navigate = useNavigate();
  const { products } = productsData;
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogsData); // Direct import from JSON file
  }, []);

  const industries = [
    {
      image: i1,
      label: "Oil & Gas Offshore",
      link: "/industries/oil-gas-offshore",
    },
    {
      image: i2,
      label: "Offshore Containers",
      link: "/industries/offshore-containers",
    },
    {
      image: i3,
      label: "Offshore Wind Energy",
      link: "/industries/offshore-wind-energy",
    },
    {
      image: i4,
      label: "Military & Defense Industries",
      link: "/industries/military-defense-industries",
    },
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
    client10,
    client11,
    client12,
    client13,
    client14,
    client15,
    client16,
    client17,
    client18,
    client19,
  ];

  // Duplicate the list for seamless infinite loop
  const allClients = [...clients, ...clients];

  const handleExploreClick = () => {
    navigate("/products");
  };
  const handleExploreAbout = () => {
    navigate("/about");
  };

  const getImageUrl = (imageName) => {
    return new URL(`../../assets/${imageName}`, import.meta.url).href;
  };

  const handleBlogClick = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    navigate(`/blogs/${slug}`);
  };

  const images = [herobg1, herobg2, herobg3, herobg4, herobg5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-wrapper">
          <div className="hero-overlay"></div>
          <div className="hero-slider">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className={`hero-bg ${index === currentIndex ? "active" : ""}`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="hero-content">
            <h4>
              <span className="orange">#</span>WELCOME TO QUICKFIT
            </h4>
            <h1>Quick Fit – Globally Certified – Offshore Ready.</h1>
            <p>
              Setting the benchmark in offshore containers, fully certified to
              DNV 2.7-1 and ISO 10855 standards{" "}
            </p>
            <button className="hero-button" onClick={handleExploreClick}>
              Explore Products
            </button>
          </div>
        </div>

        <div className="hero-card-section">
          <div className="hero-card">
            <FaCertificate className="hero-icon" aria-hidden="true" />
            <h2>DNV 2.7-1 / ISO 10855</h2>
            <p>Certified Containers</p>
          </div>
          <div className="hero-card">
            <FaUserTie className="hero-icon" aria-hidden="true" />
            <h2>70+ Approved</h2>
            <p>Offshore CCU Designs</p>
          </div>
          <div className="hero-card">
            <FaGlobeAmericas className="hero-icon" aria-hidden="true" />
            <h2>Worldwide</h2>
            <p>Supply Coverage</p>
          </div>
          <div className="hero-card">
            <FaUserTie className="hero-icon" aria-hidden="true" />
            <h2>25+ Years</h2>
            <p>of Manufacturing Expertise</p>
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
            Complete Global
            <br /> Supply Coverage for Your <br /> Offshore Needs
          </h2>
        </div>
        <div className="why-right">
          <p className="why-description">
            Quickfit is more than a manufacturer — we're your offshore solutions
            partner. We deliver end-to-end offshore cargo carrying units, fully
            certified to DNV ST-E271 (DNV 2.7-1), ISO 10855 (EN 12079), CSC,
            IMDG, and IMO standards.
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
          {products
            .filter((product) =>
              [1, 16, 3, 23, 28, 29, 30, 13].includes(product.id)
            )
            .map((product, index) => (
              <Link to={product.link} key={product.id}>
                <div className="product-card">
                  <div className="card-image-wrapper">
                    <h1 className="card-number">
                      {String(index + 1).padStart(2, "0")}
                    </h1>
                    <img
                      src={getImageUrl(product.img)}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="card-caption">{product.title}</div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <button className="hero-button" onClick={handleExploreClick}>
          Explore All Products
        </button>
      </section>

      <section className="since-section">
        <div className="since-content">
          <div className="arrow-icon">
            <MdArrowOutward />
          </div>

          <div className="since-text">
            <h5 className="tag">
              <span className="orange">#</span>ABOUT QUICKFIT
            </h5>
            <h2 className="headline">
              Engineering Confidence for Offshore Operations
            </h2>
            <p className="description">
              At Quickfit, we specialize in the design and manufacturing of
              certified offshore equipment built to perform in the world’s most
              demanding environments. With a legacy dating back to 1998, we have
              established ourselves as a trusted partner in the energy, marine,
              and industrial sectors. <br />
              As a principal designer and DNV-certified manufacturer, we combine
              deep technical knowledge with advanced fabrication capabilities
              and trusted vendor supply network to ensure every product meets
              the highest international standards, including DNV 2.7-1, ISO
              10855, EN 12079, CSC, IMDG, and IMO.
            </p>
            <button className="hero-button" onClick={handleExploreAbout}>
              More About Quickfit
            </button>
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
              <h3 className="stat-number">1000+</h3>
              <p className="stat-label">Units Delivered</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">70+</h3>
              <p className="stat-label">Countries</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">50+</h3>
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
            <Link to={industry.link} key={index}>
              <div className="industry-card">
                <div className="image-container">
                  <img src={industry.image} alt={industry.label} />
                  <div className="icon-overlay">
                    <FaArrowRightLong className="icon" />
                  </div>
                </div>
                <h3 className="label">{industry.label}</h3>
                <div className="underline"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="certifications-section">
        <div className="certifications-container">
          <div className="cert-logos">
            <img src={c1} alt="Certification 1" />
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
          {blogs.slice(0, 3).map((blog, index) => (
            <div
              className={`blog-card ${index === 0 ? "featured" : ""}`}
              key={blog.id}
              onClick={() => handleBlogClick(blog.title)}
            >
              <img src={getImageUrl(blog.image)} alt={blog.title} />
              <div className="blog-info">
                <div className="blog-meta">
                  <span className="blog-tag">{blog.tag}</span>
                  <span className="blog-date">{blog.date}</span>
                </div>
                <h3 className="blog-title">{blog.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-button">
          <button className="hero-button" onClick={() => navigate("/blogs")}>
            Explore All Blogs
          </button>
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
        {`/* Global Styles */
.home-page {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  color: #333;
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.hero-bg-wrapper {
  position: relative;
  width: 100%;
  height: 80vh;
  max-height: 1400px;
  overflow: hidden;
}

.hero-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Send behind overlay and content */
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

.hero-bg.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0.1)
  );
  z-index: 2; /* Above images, below content */
}

.hero-content {
  position: relative;
  z-index: 3; /* Top layer */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 600px;
  color: white;
}


.hero-content h4 {
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: 1px;
}



.hero-content h1 {
  font-size: clamp(32px, 5vw, 46px);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 20px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: clamp(16px, 2vw, 18px);
  color: #f0f0f0;
  margin-bottom: 32px;
  max-width: 500px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}



/* Responsive Adjustments */
@media (max-width: 992px) {
  .hero-bg-wrapper {
    height: 80vh; /* Increased height for tablet */
    min-height: 800px; /* Taller minimum height */
  }

  .hero-content {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-bg-wrapper {
    height: 300vh; /* Full viewport height on mobile */
    min-height: 900px; /* Even taller minimum height */
  }

  .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }

  .hero-content {
    padding: 2rem 1rem;
    max-width: 100%;
  }

  .hero-content p {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-bg-wrapper {
    min-height: 1000px; /* Maximum height for smallest devices */
  }
}
/* Hero Cards */
.hero-card-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  position: relative;
  margin: -70px auto 0;
  padding: 20px;
  z-index: 3;
}

.hero-card {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.hero-icon {
  font-size: 42px;
  color: #00284d;
  margin-bottom: 15px;
}

.hero-card h2 {
  font-size: clamp(18px, 2vw, 20px);
  font-weight: 600;
  color: #002244;
  margin-bottom: 6px;
}

.hero-card p {
  font-size: clamp(14px, 1.5vw, 15px);
  color: #444;
  margin: 0;
}

/* Why Choose Section */
.why-choose-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 80px 40px;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.why-left,
.why-right {
  flex: 1 1 45%;
  min-width: 280px;
}

.why-subtitle {
  display: inline-block;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.why-title {
  font-size: clamp(26px, 3.5vw, 32px);
  font-weight: 700;
  line-height: 1.3;
  background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 20px 0;
}

.why-description {
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
  color: #666;
  margin: 0;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .hero-bg-wrapper {
    height: 80vh;
    min-height: 500px;
  }

  .hero-card-section {
    margin-top: 20px;
  }

  .why-choose-section {
    padding: 60px 30px;
  }
}

@media (max-width: 768px) {
  .hero-bg-wrapper {
    height: 85vh;
    min-height: 400px;
  }

  .hero-content p {
    max-width: 100%;
  }


  .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }

  .why-choose-section {
    padding: 40px 20px;
    gap: 20px;
  }

  .why-title {
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .hero-card-section {
    padding: 10px;
    gap: 15px;
  }

  .hero-card {
    padding: 20px 15px;
    max-width: 100%;
  }

  .why-choose-section {
    padding: 30px 15px;
  }

  .why-subtitle {
    font-size: 12px;
  }
}
.popular-section {
  padding: 4rem 1rem;
  text-align: center;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.section-heading h4 {
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 500;
  margin-bottom: 60px;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
}

.section-heading h4::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
}



.product-cards {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-bottom: 60px;
  position: relative;
}

.product-card {
  position: relative;
  width: 340px;
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.card-image-wrapper {
  position: relative;
  overflow: visible;
  height: 300px;
}

.product-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  filter: brightness(0.95);
}

.product-card:hover .product-image {
  filter: brightness(1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.card-number {
  position: absolute;
  top: -50px;
  left: -20px;
  font-size: 60px;
  font-weight: 900;
  color: rgb(255, 69, 0);
  z-index: 1;
  pointer-events: none;
  transition: all 0.4s ease;
}

.product-card:hover .card-number {
  transform: scale(1.1) translateY(-10px);
  text-shadow: 8px 8px 0 rgba(0, 0, 0, 0.08);
}

.card-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 18px 0;
  background: linear-gradient(transparent, rgba(0, 34, 68, 0.9));
  color: white;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 3;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  transition: all 0.3s ease;
}

.product-card:hover .card-caption {
  padding: 22px 0;
  background: linear-gradient(transparent, rgba(0, 34, 68, 0.95));
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .product-cards {
    gap: 30px;
  }

  .product-card {
    width: 300px;
    margin-top: 70px;
  }

  .card-number {
    font-size: 80px;
    top: -50px;
    left: -15px;
  }
}

@media (max-width: 768px) {
  .popular-section {
    padding: 3rem 1rem;
  }

  .product-cards {
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }

  .product-card {
    width: 85%;
    margin-top: 80px;
  }

  .card-number {
    font-size: 90px;
    top: -60px;
    left: -10px;
  }

  .card-number::before {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .product-card {
    width: 95%;
    margin-top: 70px;
  }

  .card-number {
    font-size: 70px;
    top: -50px;
    left: -5px;
  }

  .card-caption {
    font-size: 14px;
    padding: 14px 0;
  }

  .explore-btn {
    padding: 14px 28px;
    font-size: 15px;
  }
}

.since-section {
  padding: 1rem;
  background-color: #fefefe;
}

.since-heading {
  font-size: 12rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 20px;
}

.since-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.arrow-icon {
  font-size: 200px;
  color: #ff4500;
  flex-shrink: 0;
  margin-top: 20px;
}

.since-text {
  max-width: 600px;
}

.tag {
  color: #000;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.headline {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #000;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  color: #787676;
  margin-bottom: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .since-heading {
    font-size: 4rem;
  }

  .arrow-icon {
    display: none;
  }

  .headline {
    font-size: 22px;
  }
}

.global-reach {
  position: relative;
  color: white;
  text-align: center;
  padding: 60px 20px;
  background: #005db3;
  background: linear-gradient(
    0deg,
    rgba(0, 93, 179, 1) 0%,
    rgba(0, 40, 77, 1) 100%
  );
  overflow: hidden;
}

.background-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  z-index: 1;
}

.overlay {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: auto;
}

.subtitle {
  color: #fff;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.title {
  font-size: 28px;
  margin-bottom: 40px;
  font-weight: 700;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.stat-box {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  color: #ff5c1c;
  margin: 0;
}

.stat-label {
  font-size: 18px;
  margin: 5px 0 0;
}

.industries {
  text-align: center;
  padding: 1rem;
  background-color: white;
}

.industries-subtitle {
  color: #000;
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.industries-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #000;
}

.industry-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.industry-card {
  width: 300px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.industry-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

.icon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 123, 255, 0.5); /* Transparent blue */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.industry-card:hover .icon-overlay {
  opacity: 1;
}

.icon {
  color: #fff;
  font-size: 30px;
}

.label {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.underline {
  width: 40px;
  height: 2px;
  background-color: #f15a24;
  margin: 6px auto 0;
}

.certifications-section {
  display: flex;
  background-color: white;
  padding: 60px 20px;
  justify-content: center;
  background-color: white;
  padding: 60px 20px;
}

.certifications-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  gap: 30px;
  align-content: center;
}
.cert-logos {    display: grid
;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, auto);
    gap: 30px;
    justify-items: center;
    align-items: center;
}

.cert-logos img {
  height: 200px;
  object-fit: contain;
}

.cert-content {
  flex: 1;
  min-width: 280px;
  text-align: left;
}

.cert-subtitle {
  font-size: 14px;
  color: #000;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cert-title {
  font-size: 30px;
  font-weight: bold;
  color: #f15a24; /* Strong red for emphasis */
  margin-bottom: 20px;
  line-height: 1.3;
}

.cert-description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  max-width: 500px;
}

@media (max-width: 425px) {
  .certifications-container {
    flex-direction: column-reverse;
  }
}

.recent-blogs {
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
}

.section-title {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-bottom: 30px;
}

.blogs-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}

.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.blog-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.blog-card:hover img {
  transform: scale(1.05);
}

.blog-info {
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
  color: white;
  z-index: 2;
}

.blog-meta {
  display: flex;
  gap: 10px;
  font-size: 12px;
  margin-bottom: 8px;
  color: #ccc;
}

.blog-tag {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border: solid 1px #f15a24;
  border-radius: 4px;
}

.blog-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 1.3;
}

.featured {
  grid-row: span 2;
}

.blog-button {
  margin-top: 30px;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .blogs-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  .featured {
    grid-row: auto;
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .blogs-grid {
    grid-template-columns: 1fr;
  }

  .featured {
    grid-column: span 1;
  }

  
.industry-card {
  width: 220px;
        }
}
`}
      </style>
    </div>
  );
};

export default Home;
