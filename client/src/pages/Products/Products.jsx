import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../../../public/productsData.json";

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
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ categories: [], products: [] });

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from an API endpoint
        // const response = await fetch('/api/products');
        // const data = await response.json();

        // Using imported JSON for this example
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  const getImageUrl = (imageName) => {
    return new URL(`../../assets/${imageName}`, import.meta.url).href;
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="products-hero">
        <div className="hero-content">
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
                    onClick={() => setActiveCategory(cat)}
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
            <button className="contact-button">Request Custom Quote</button>
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
                    <img src={getImageUrl(product.img)} alt={product.title} />

                    <button
                      className="quick-view-btn"
                      onClick={() => openQuickView(product)}
                    >
                      Quick View
                    </button>
                  </div>
                  <div className="product-info">
                    <div className="product-rating">
                      <FiStar className="star-icon" />
                      <span>{product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>
                    <h3>{product.title}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-features">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="product-actions">
                      <button className="quote-btn">Get a Quote</button>
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
                <div className="price-range">{quickViewProduct.price}</div>
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
                      <span className="spec-label">Category:</span>
                      <span className="spec-value">
                        {quickViewProduct.category}
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
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  <button className="modal-quote-btn">
                    Request Custom Quote
                  </button>
                  <button
                    className="modal-contact-btn"
                    onClick={() => viewDetails(quickViewProduct.id)}
                  >
                    View Full Details
                  </button>
                </div>
              </div>
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
            <button className="cta-primary">
              Request a Design Consultation
            </button>
            <button className="cta-secondary">Download Product Catalog</button>
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
  --border-radius-xl: 16px;
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
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.products-page {
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Enhanced Hero Section */
.products-hero {
  background-size: cover;
  background-position: center;
  color: var(--white);
  background-image: linear-gradient(135deg, rgba(1, 40, 78, 0.85) 0%, rgba(0, 26, 51, 0.9) 100%), url("/src/assets/producthero.jpg");
  text-align: center;
  padding: 120px 20px;
  margin-bottom: 60px;
  border-radius: var(--border-radius-xl);
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-large);
}

.products-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 26, 51, 0.5) 100%);
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
  margin-bottom: 24px;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.products-hero p {
  font-size: 1.3rem;
  margin: 0 auto 40px;
  max-width: 700px;
  opacity: 0.9;
  font-weight: 300;
  line-height: 1.6;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.hero-badges span {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 10px 24px;
  border-radius: 30px;
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
  gap: 40px;
  position: relative;
  margin-bottom: 100px;
}

/* Enhanced Mobile Filter Button */
.mobile-filter-btn {
  display: none;
  align-items: center;
  gap: 12px;
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 16px 28px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 30px;
  width: 100%;
  justify-content: center;
  transition: var(--transition);
  box-shadow: var(--shadow);
  font-size: 1rem;
}

.mobile-filter-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

/* Modernized Sidebar */
.sidebar {
  width: 320px;
  background: var(--white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-large);
  padding: 30px;
  height: fit-content;
  position: sticky;
  top: 30px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--light-gray);
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box {
  position: relative;
  margin-bottom: 35px;
}

.search-box input {
  width: 100%;
  padding: 14px 15px 14px 50px;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  background: var(--light);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(1, 40, 78, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.05);
  background: var(--white);
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray);
  font-size: 1.2rem;
}

.filter-section {
  margin-bottom: 35px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 8px;
}

.category-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 20px;
  font-size: 1rem;
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
  transform: translateX(5px);
}

.category-btn.active {
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--white);
  font-weight: 600;
  box-shadow: var(--shadow);
}

.product-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.category-btn.active .product-count {
  background: rgba(255, 255, 255, 0.3);
}

.certification-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.badge {
  background: var(--light-gray);
  padding: 10px 18px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-dark);
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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

.contact-section {
  margin-top: 45px;
  padding-top: 30px;
  border-top: 1px solid var(--light-gray);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.95rem;
  color: var(--dark);
}

.contact-icon {
  color: var(--primary);
  font-size: 1.3rem;
  flex-shrink: 0;
}

.contact-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, var(--secondary) 0%, var(--accent) 100%);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 15px;
  font-size: 1rem;
  box-shadow: var(--shadow);
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
  opacity: 0.95;
}

/* Enhanced Products Content */
.products-content {
  flex: 1;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  flex-wrap: wrap;
  gap: 25px;
}

.products-header h2 {
  font-size: 1.7rem;
  color: var(--primary-dark);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sort-select {
  padding: 12px 18px;
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  background: var(--white);
  font-size: 1rem;
  cursor: pointer;
  min-width: 220px;
  transition: var(--transition);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 18px;
  box-shadow: var(--shadow);
}

.sort-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(1, 40, 78, 0.2), var(--shadow);
}

.no-results {
  text-align: center;
  padding: 80px 30px;
  background: var(--white);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-large);
}

.no-results h3 {
  font-size: 1.7rem;
  color: var(--primary-dark);
  margin-bottom: 15px;
}

.no-results p {
  color: var(--gray);
  margin-bottom: 25px;
  font-size: 1.1rem;
}

.reset-filters-btn {
  padding: 12px 24px;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
  box-shadow: var(--shadow);
}

.reset-filters-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* Modern Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;
}

.product-card {
  background: var(--white);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-hover);
}

.product-badge {
  position: absolute;
  top: 18px;
  left: 18px;
  background: var(--secondary);
  color: var(--white);
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  overflow: hidden;
  height: 240px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: var(--transition);
  mix-blend-mode: multiply;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.product-card:hover .product-image-container img {
  transform: scale(1.08);
}

.quick-view-btn {
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  background: var(--primary);
  color: var(--white);
  border: none;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  opacity: 0;
}

.product-card:hover .quick-view-btn {
  bottom: 0;
  opacity: 1;
}

.product-info {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary);
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.star-icon {
  font-size: 1.1rem;
}

.reviews {
  color: var(--gray);
  font-weight: normal;
  font-size: 0.9rem;
}

.product-card h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: var(--primary-dark);
  line-height: 1.3;
  font-weight: 700;
}

.product-description {
  color: var(--gray);
  font-size: 1rem;
  margin-bottom: 18px;
  line-height: 1.6;
  flex: 1;
}

.price-range {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.feature-tag {
  background: var(--primary-light);
  color: var(--primary-dark);
  padding: 7px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition: var(--transition);
}

.feature-tag:hover {
  background: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
}

.product-actions {
  display: flex;
  gap: 15px;
  margin-top: auto;
}

.quote-btn {
  background: linear-gradient(90deg, var(--secondary) 0%, var(--accent) 100%);
  color: var(--white);
  border: none;
  padding: 14px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  transition: var(--transition);
  box-shadow: var(--shadow);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.quote-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
  opacity: 0.95;
}

.details-btn {
  background: var(--white);
  color: var(--primary);
  padding: 13px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  transition: var(--transition);
  border: 2px solid var(--primary);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.details-btn:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

/* Enhanced Quick View Modal */
.quick-view-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  position: relative;
  background: var(--white);
  border-radius: var(--border-radius-xl);
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-large);
  z-index: 1;
  animation: modalFadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-modal {
  position: absolute;
  top: 25px;
  right: 25px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  font-size: 1.8rem;
  color: var(--gray);
  cursor: pointer;
  z-index: 2;
  transition: var(--transition);
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  backdrop-filter: blur(2px);
}

.close-modal:hover {
  color: var(--dark);
  background: rgba(0, 0, 0, 0.1);
}

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 50px;
}

.modal-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image {
  height: 400px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.main-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15));
}

.modal-details h2 {
  font-size: 2rem;
  color: var(--primary-dark);
  margin-bottom: 20px;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.modal-details .product-rating {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.modal-details .price-range {
  font-size: 1.5rem;
  margin-bottom: 25px;
  font-weight: 800;
}

.modal-details .product-description {
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.7;
  color: var(--dark);
}

.specs-section {
  margin-bottom: 30px;
}

.specs-section h3 {
  font-size: 1.3rem;
  color: var(--primary-dark);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--light-gray);
  font-weight: 700;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 5px;
}

.spec-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark);
}

.features-section h3 {
  font-size: 1.3rem;
  color: var(--primary-dark);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--light-gray);
  font-weight: 700;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 1rem;
  line-height: 1.6;
}

.feature-check {
  color: var(--success);
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 3px;
}

.modal-actions {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.modal-quote-btn {
  flex: 1;
  padding: 18px;
  background: linear-gradient(90deg, var(--secondary) 0%, var(--accent) 100%);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-quote-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
  opacity: 0.95;
}

.modal-contact-btn {
  flex: 1;
  padding: 18px;
  background: var(--white);
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-contact-btn:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

/* Enhanced Value Propositions */
.value-propositions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin: 80px 0;
}

.value-card {
  background: var(--white);
  border-radius: var(--border-radius-xl);
  padding: 40px 30px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.value-icon-container {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-light) 0%, rgba(1, 40, 78, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  transition: var(--transition);
}

.value-card:hover .value-icon-container {
  transform: rotate(10deg) scale(1.1);
}

.value-icon {
  color: var(--primary);
  font-size: 2rem;
}

.value-card h3 {
  font-size: 1.4rem;
  color: var(--primary-dark);
  margin-bottom: 20px;
  font-weight: 700;
}

.value-card p {
  color: var(--gray);
  font-size: 1rem;
  line-height: 1.7;
}

/* Premium CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--white);
  padding: 80px 40px;
  border-radius: var(--border-radius-xl);
  margin-bottom: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-large);
}

.cta-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-section h2 {
  font-size: 2.3rem;
  margin-bottom: 25px;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-primary {
  background: var(--white);
  color: var(--primary);
  border: none;
  padding: 16px 32px;
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.cta-primary::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -60%;
  width: 200%;
  height: 200%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(30deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -60%; }
  20% { left: 100%; }
  100% { left: 100%; }
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.cta-secondary {
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255, 255, 255, 0.4);
  padding: 16px 32px;
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  backdrop-filter: blur(2px);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--white);
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .modal-grid {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 350px;
  }
}

@media (max-width: 992px) {
  .products-hero h1 {
    font-size: 2.5rem;
  }

  .products-hero p {
    font-size: 1.2rem;
  }

  .products-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
    margin-bottom: 40px;
    display: none;
  }

  .sidebar.mobile-visible {
    display: block;
    animation: slideDown 0.4s ease;
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

  .modal-grid {
    padding: 40px;
  }

  .cta-section h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .products-hero {
    padding: 100px 20px;
  }

  .products-hero h1 {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .modal-details h2 {
    font-size: 1.7rem;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }

  .value-propositions {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 350px;
  }
}

@media (max-width: 576px) {
  .products-hero {
    padding: 80px 15px;
  }

  .products-hero h1 {
    font-size: 1.8rem;
  }

  .products-hero p {
    font-size: 1.1rem;
  }

  .hero-badges span {
    padding: 8px 18px;
    font-size: 0.85rem;
  }

  .modal-grid {
    padding: 30px 20px;
    gap: 30px;
  }

  .main-image {
    height: 280px;
  }

  .cta-section h2 {
    font-size: 1.8rem;
  }

  .cta-section p {
    font-size: 1rem;
  }
}`}
      </style>
    </div>
  );
};

export default Products;
