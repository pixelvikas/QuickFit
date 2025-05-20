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
} from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
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
    // Simulate API fetch
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

  // Calculate product counts per category
  const getProductCounts = () => {
    const counts = {};
    data.categories.forEach((cat) => {
      counts[cat] =
        cat === "All"
          ? data.products.length
          : data.products.filter((p) => p.category === cat).length;
    });
    return counts;
  };

  const productCounts = getProductCounts();

  // Filter products based on search term and active category
  const filteredProducts = data.products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    document.body.style.overflow = "hidden";
  };

  const viewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
    document.body.style.overflow = "auto";
  };
  const getImageUrl = (imageName) => {
    try {
      // For Vite or Create React App
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    } catch (err) {
      console.error("Error loading image:", err);
      // Return a default image if the specific image fails to load
      return new URL(`../../assets/default-product.jpg`, import.meta.url).href;
    }
  };

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
            <button className="contact-button" onClick={handleCustomQuote}>
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
                    <div className="product-rating">
                      <FiStar className="star-icon" />
                      <span>{product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>
                    <h3>{product.title}</h3>
                    <p className="product-description">{product.description}</p>

                    <div className="product-features">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="product-actions">
                      <button
                        className="quote-btn"
                        onClick={() => openQuoteModal(product)}
                      >
                        Get a Quote
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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal">
          <div className="modal-overlay" onClick={closeQuickView}></div>
          <div className="modal-content">
            <button className="close-modal" onClick={closeQuickView}>
              &times;
            </button>
            <div className="modal-grid">
              <div className="modal-images">
                <div className="main-image">
                  <img
                    src={getImageUrl(quickViewProduct.img)}
                    alt={quickViewProduct.title}
                  />
                </div>
              </div>
              <div className="modal-details">
                <h2>{quickViewProduct.title}</h2>
                <p className="product-category">{quickViewProduct.category}</p>
                <div className="product-rating">
                  <FiStar className="star-icon" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="reviews">
                    ({quickViewProduct.reviews} reviews)
                  </span>
                </div>

                <p className="product-description">
                  {quickViewProduct.description}
                </p>

                <div className="specs-section">
                  <h3>Specifications</h3>
                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-label">Capacity:</span>
                      <span className="spec-value">
                        {quickViewProduct.capacity}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Lead Time:</span>
                      <span className="spec-value">
                        {quickViewProduct.leadTime}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Price Range:</span>
                      <span className="spec-value">
                        {quickViewProduct.price}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Material:</span>
                      <span className="spec-value">Marine-grade steel</span>
                    </div>
                  </div>
                </div>

                <div className="features-section">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {quickViewProduct.features.map((feature, i) => (
                      <li key={i}>
                        <FiCheckCircle className="feature-check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  <button
                    className="quote-btn"
                    onClick={() => {
                      closeQuickView();
                      openQuoteModal(quickViewProduct);
                    }}
                  >
                    Get a Quote
                  </button>
                  <button
                    className="modal-contact-btn"
                    onClick={() => viewDetails(quickViewProduct.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    onError={(e) => {
                      e.target.src = defaultProductImage;
                    }}
                  />
                </div>
                <div className="modal-product-details">
                  <h3>{currentProduct.title}</h3>
                  <p className="product-category">{currentProduct.category}</p>
                  <div className="modal-features">
                    {currentProduct.features
                      .slice(0, 3)
                      .map((feature, index) => (
                        <div key={index} className="modal-feature-item">
                          <FiCheckCircle className="modal-feature-icon" />
                          <span>{feature}</span>
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
  --transition: all 0.3s ease;
  --border-radius: 8px;
  --border-radius-lg: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.6;
  color: var(--dark);
  background-color: var(--light);
  -webkit-font-smoothing: antialiased;
}

.products-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 1rem;
  }
  
  /* Hero Section */
  .products-hero {
    background-size: cover;
    background-position: center;
    color: var(--white);
  text-align: center;
  padding: 100px 20px;
  margin-bottom: 50px;
  border-radius: var(--border-radius-lg);
  position: relative;
  overflow: hidden;
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
    rgba(1, 40, 78, 0.1) 0%,
    rgba(0, 26, 51, 0.4) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.products-hero h1 {
  font-size: 2.75rem;
  margin-bottom: 20px;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.products-hero p {
  font-size: 1.25rem;
  margin: 0 auto 30px;
  max-width: 700px;
  opacity: 0.9;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 7px;
  flex-wrap: wrap;
}

.hero-badges span {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Main Container */
.products-container {
  display: flex;
  gap: 30px;
  position: relative;
  margin-bottom: 80px;
}

/* Mobile Filter Button */
.mobile-filter-btn {
  display: none;
  align-items: center;
  gap: 10px;
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 14px 24px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 25px;
  width: 100%;
  justify-content: center;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.mobile-filter-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Sidebar */
.sidebar {
  width: 300px;
  background: var(--white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
  padding: 25px;
  height: fit-content;
  position: sticky;
  top: 30px;
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--light-gray);
}

.search-box {
  position: relative;
  margin-bottom: 30px;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  transition: var(--transition);
  background: var(--light);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(1, 40, 78, 0.2);
  background: var(--white);
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray);
  font-size: 1.1rem;
}

.filter-section {
  margin-bottom: 30px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 6px;
}

.category-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 15px;
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  transition: var(--transition);
  background: none;
  border: none;
  text-align: left;
  color: var(--dark);
}

.category-btn:hover {
  background: var(--primary-light);
  color: var(--primary);
}

.category-btn.active {
  background: var(--primary);
  color: var(--white);
  font-weight: 500;
}

.product-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.category-btn.active .product-count {
  background: rgba(255, 255, 255, 0.3);
}

.certification-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.badge {
  background: var(--light-gray);
  padding: 8px 15px;
  border-radius: var(--border-radius);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-dark);
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
}

.badge:hover {
  background: var(--primary-light);
  border-color: var(--primary);
}

.badge.active {
  background: var(--primary);
  color: var(--white);
}

.contact-section {
  margin-top: 40px;
  padding-top: 25px;
  border-top: 1px solid var(--light-gray);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--dark);
}

.contact-icon {
  color: var(--primary);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.contact-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 10px;
}


`}
      </style>
    </div>
  );
};

export default Products;
