import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../../productsData.json";
import productHero from "../../assets/producthero.jpg";

// Import icons
import {
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiX,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaShippingFast,
  FaCertificate,
  FaShieldAlt,
  FaWhatsapp,
  FaBox,
  FaTemperatureLow,
} from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ categories: [], products: [] });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    message: "",
  });
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductCounts = () => {
    const counts = {};
    data.categories.forEach((cat) => {
      counts[cat] =
        cat === "All"
          ? data.products.length
          : data.products.filter((p) => p.category.includes(cat)).length;
    });
    return counts;
  };

  const productCounts = getProductCounts();

  const filteredProducts = data.products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || product.category.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  const viewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    } catch (err) {
      console.error("Error loading image:", err);
      return new URL(`../../assets/default-product.jpg`, import.meta.url).href;
    }
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    console.log("Quote request submitted:", formData);
    setShowQuoteModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      quantity: 1,
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openQuoteModal = (product) => {
    setCurrentProduct(product);
    setShowQuoteModal(true);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  const handleCustomQuote = () => {
    navigate("/contact");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/product-catalog.pdf";
    link.download = "Product-Catalog.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div
        className="products-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(1, 40, 78, 0.85) 0%, rgba(0, 26, 51, 0.9) 100%), url(${productHero})`,
        }}
      >
        <div className="hero-section">
          <h1>Premium Offshore Containers</h1>
          <p>DNV & CSC certified solutions for demanding marine environments</p>
          <div className="hero-badges">
            <span>Certified Quality</span>
            <span>Global Shipping</span>
            <span>10-Year Warranty</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-container">
        {/* Mobile Filter Button */}
        <button
          className="mobile-filter-btn"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <FiFilter /> Filters{" "}
          {showMobileFilters ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {/* Sidebar - Filters */}
        <div className={`sidebar ${showMobileFilters ? "mobile-visible" : ""}`}>
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h2 className="sidebar-title">PRODUCT CATEGORIES</h2>
            <ul className="category-list">
              {data.categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    className={`category-btn ${
                      activeCategory === cat ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowMobileFilters(false);
                    }}
                  >
                    {cat}
                    <span className="product-count">
                      ({productCounts[cat]})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-section">
            <h2 className="sidebar-title">CONTACT US</h2>
            <div className="contact-info">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>sales@offshorecontainers.com</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="contact-item">
                <FaWhatsapp className="contact-icon" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>123 Marine Way, Houston, TX</span>
              </div>
            </div>
            <button
              className="contact-button"
              onClick={() => navigate("/contact")}
            >
              Request Custom Quote
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-content">
          <div className="products-header">
            <h2>
              {activeCategory === "All" ? "All Products" : activeCategory}
              <span> ({filteredProducts.length} products)</span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h3>No products found in this category</h3>
              <p>
                {searchTerm
                  ? "No products match your search criteria"
                  : `There are currently no products in the ${activeCategory} category`}
              </p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image-container">
                    <img
                      src={getImageUrl(product.img)}
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-description">
                      {product.shortDescription}
                    </p>

                    <div className="product-features">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="feature-tag">
                          <span>{feature.title}</span>
                        </div>
                      ))}
                    </div>

                    <div className="product-actions">
                      <button
                        className="quote-btn"
                        onClick={() => openQuoteModal(product)}
                      >
                        Instant Quote
                      </button>
                      <button
                        className="details-btn"
                        onClick={() => viewDetails(product.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Quote Modal */}
      {showQuoteModal && currentProduct && (
        <div className="modal-overlay">
          <div className="quick-quote-modal">
            <button
              className="close-modal"
              onClick={() => setShowQuoteModal(false)}
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>

            <div className="modal-content">
              <div className="modal-product-info">
                <div className="modal-image-wrapper">
                  <img
                    src={getImageUrl(currentProduct.img)}
                    alt={currentProduct.title}
                    className="modal-product-image"
                  />
                </div>
                <div className="modal-product-details">
                  <h3>{currentProduct.title}</h3>
                  <p className="product-category">
                    {Array.isArray(currentProduct.category)
                      ? currentProduct.category.join(", ")
                      : currentProduct.category}
                  </p>

                  <div className="modal-specs">
                    <div className="spec-item">
                      <strong>Capacity:</strong> {currentProduct.capacity}
                    </div>
                    <div className="spec-item">
                      <strong>Lead Time:</strong> {currentProduct.leadTime}
                    </div>
                    <div className="spec-item">
                      <strong>Warranty:</strong> {currentProduct.warranty}
                    </div>
                    <div className="spec-item">
                      <strong>Dimensions:</strong>{" "}
                      {currentProduct.specifications.dimensions.external}
                    </div>
                  </div>

                  <div className="modal-features">
                    {currentProduct.features.map((feature, index) => (
                      <div key={index} className="modal-feature-item">
                        <FiCheckCircle className="modal-feature-icon" />
                        <div>
                          <strong>{feature.title}</strong>
                          <p>{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <form className="quote-form" onSubmit={handleSubmitQuote}>
                <h3>Request a Quick Quote</h3>

                <div className="form-group">
                  <label htmlFor="name">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="1"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Additional Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please specify any special requirements, modifications, or certifications needed"
                  />
                </div>

                <button type="submit" className="submit-quote-btn">
                  Submit Quote Request <FiArrowRight className="btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Value Propositions */}
      <div className="value-propositions">
        <div className="value-card">
          <div className="value-icon-container">
            <FaShippingFast className="value-icon" />
          </div>
          <h3>Global Shipping</h3>
          <p>Fast delivery to ports worldwide with customs clearance support</p>
        </div>
        <div className="value-card">
          <div className="value-icon-container">
            <FaCertificate className="value-icon" />
          </div>
          <h3>Certified Quality</h3>
          <p>All containers meet DNV 2.7-1, CSC, and EN12079 standards</p>
        </div>
        <div className="value-card">
          <div className="value-icon-container">
            <FaShieldAlt className="value-icon" />
          </div>
          <h3>10-Year Warranty</h3>
          <p>Industry-leading protection against corrosion and defects</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Need a Custom Offshore Container Solution?</h2>
          <p>
            Our engineering team can design and manufacture containers to your
            exact specifications
          </p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleCustomQuote}>
              Request a Design Consultation
            </button>
            <button className="cta-secondary" onClick={handleDownload}>
              Download Product Catalog
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
       :root {
  --primary: #01284e;
  --primary-dark: #001a33;
  --primary-light: #e6f0fa;
  --secondary: #ff7d00;
  --secondary-dark: #e06a00;
  --accent: #ef3b2d;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --white: #ffffff;
  --success: #28a745;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 12px 28px rgba(0, 0, 0, 0.15);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --border-radius: 8px;
  --border-radius-lg: 12px;
  --sidebar-width: 300px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--dark);
  background-color: var(--light);
  -webkit-font-smoothing: antialiased;
}

.products-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Enhanced Hero Section */
.products-hero {
  background-size: cover;
  background-position: center;
  color: var(--white);
  text-align: center;
  padding: 120px 20px;
  margin-bottom: 3rem;
  border-radius: var(--border-radius-lg);
  position: relative;
  overflow: hidden;
  background-attachment: fixed;
}

.products-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(1, 40, 78, 0.2) 0%,
    rgba(0, 26, 51, 0.6) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.products-hero h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.products-hero p {
  font-size: 1.3rem;
  margin: 0 auto 2.5rem;
  max-width: 700px;
  opacity: 0.9;
  font-weight: 300;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  animation: fadeIn 1s ease 0.3s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-badges span {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 8px 22px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: var(--transition);
}

.hero-badges span:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

/* Main Container */
.products-container {
  display: flex;
  gap: 2rem;
  position: relative;
  margin-bottom: 5rem;
}

/* Mobile Filter Button - Enhanced */
.mobile-filter-btn {
  display: none;
  align-items: center;
  gap: 10px;
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1.5rem;
  width: 100%;
  justify-content: center;
  transition: var(--transition);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.mobile-filter-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.mobile-filter-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.mobile-filter-btn:hover::after {
  left: 100%;
}

/* Sidebar - Enhanced */
.sidebar {
  width: var(--sidebar-width);
  background: var(--white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 1.5rem;
  transition: var(--transition);
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--light-gray);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-title::before {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  background: var(--secondary);
  border-radius: 50%;
}

/* Enhanced Search Box */
.search-box {
  position: relative;
  margin-bottom: 2rem;
}

.search-box input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  transition: var(--transition);
  background: var(--light);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(1, 40, 78, 0.1), inset 0 1px 3px rgba(0, 0, 0, 0.05);
  background: var(--white);
}

.search-icon {
  position: absolute;
  left: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray);
  font-size: 1.1rem;
}

/* Enhanced Filter Sections */
.filter-section {
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 0.5rem;
}

.category-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: var(--transition);
  background: none;
  border: none;
  text-align: left;
  color: var(--dark);
  position: relative;
}

.category-btn::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 1px;
  background: var(--light-gray);
  transition: var(--transition);
}

.category-btn:hover {
  background: var(--primary-light);
  color: var(--primary);
  transform: translateX(5px);
}

.category-btn:hover::after {
  left: 0.5rem;
  right: 0.5rem;
}

.category-btn.active {
  background: var(--primary);
  color: var(--white);
  font-weight: 500;
  transform: translateX(5px);
}

.category-btn.active::after {
  opacity: 0;
}

.product-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  min-width: 28px;
  text-align: center;
}

.category-btn.active .product-count {
  background: rgba(255, 255, 255, 0.3);
}

/* Enhanced Certification Badges */
.certification-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.badge {
  background: var(--light-gray);
  padding: 0.6rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-dark);
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge:hover {
  background: var(--primary-light);
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.badge.active {
  background: var(--primary);
  color: var(--white);
  box-shadow: var(--shadow);
}

/* Enhanced Contact Section */
.contact-section {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--light-gray);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.95rem;
  color: var(--dark);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.contact-item:hover {
  background: var(--primary-light);
  transform: translateX(3px);
}

.contact-icon {
  color: var(--primary);
  font-size: 1.2rem;
  flex-shrink: 0;
  width: 1.5rem;
  text-align: center;
}

/* Enhanced Contact Button */
.contact-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, var(--secondary) 0%, var(--accent) 100%);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.contact-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.contact-button:hover::before {
  left: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .products-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    position: static;
    margin-bottom: 2rem;
    display: none;
  }
  
  .sidebar.active {
    display: block;
    animation: slideDown 0.4s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .mobile-filter-btn {
    display: flex;
  }
  
  .products-hero {
    padding: 80px 20px;
  }
  
  .products-hero h1 {
    font-size: 2.25rem;
  }
  
  .products-hero p {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .products-page {
    padding: 1rem;
  }
  
  .products-hero {
    padding: 60px 15px;
    margin-bottom: 2rem;
  }
  
  .products-hero h1 {
    font-size: 2rem;
  }
  
  .hero-badges span {
    padding: 6px 16px;
    font-size: 0.85rem;
  }
  
  .contact-button {
    padding: 0.9rem;
  }
}

/* Accessibility Improvements */
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--secondary);
  outline-offset: 2px;
}

/* Loading Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}`}
      </style>
    </div>
  );
};

export default Products;
