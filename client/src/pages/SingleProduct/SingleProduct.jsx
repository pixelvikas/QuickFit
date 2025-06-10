import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiDownload,
  FiArrowRight,
  FiCheckCircle,
  FiX,
  FiStar,
} from "react-icons/fi";

import {
  FaCertificate,
  FaShieldAlt,
  FaBox,
  FaTemperatureLow,
  FaWeightHanging,
  FaShippingFast,
} from "react-icons/fa";
import productsData from "../../productsData.json";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("specifications");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    message: "",
  });

  useEffect(() => {
    const foundProduct = productsData.products.find(
      (p) => p.id === parseInt(id)
    );

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError("Product not found");
    }
    setLoading(false);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    } catch (e) {
      console.error("Image not found:", imageName);
      return new URL(`../../assets/placeholder-image.png`, import.meta.url)
        .href;
    }
  };

  const renderSpecificationTable = () => {
    if (!product.specifications) return null;

    return (
      <div className="spec-tables">
        <div className="spec-table-container">
          <h4>Dimensions</h4>
          <table className="spec-table">
            <tbody>
              {Object.entries(product.specifications.dimensions).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="spec-table-container">
          <h4>Weights</h4>
          <table className="spec-table">
            <tbody>
              {Object.entries(product.specifications.weights).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="spec-table-container">
          <h4>Performance</h4>
          <table className="spec-table">
            <tbody>
              {Object.entries(product.specifications.performance).map(
                ([key, value]) => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="image-wrapper">
          <img
            src={getImageUrl(product.img)}
            alt={product.title}
            className="product-image"
            loading="lazy"
            width="600"
            height="600"
          />
        </div>

        <div className="product-details">
          <div className="product-header">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.title}</h1>

            <p className="product-short-description">{product.description}</p>
          </div>

          <div className="product-features">
            <h4>Key Features:</h4>
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <div>
                    <strong>{feature.title}</strong>
                    <p>{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <div>
                <span className="meta-label">Lead Time : </span>
                <span className="meta-value">{product.leadTime}</span>
              </div>
            </div>
            <div className="meta-item">
              <div>
                <span className="meta-label">Capacity : </span>
                <span className="meta-value">{product.capacity}</span>
              </div>
            </div>
            <div className="meta-item">
              <div>
                <span className="meta-label">Warranty : </span>
                <span className="meta-value">{product.warranty}</span>
              </div>
            </div>
          </div>

          <div className="product-cta">
            <button
              className="primary-btn"
              onClick={() => setShowQuoteModal(true)}
            >
              Get Instant Quote <FiArrowRight className="btn-icon" />
            </button>
            <button className="secondary-btn">
              <FiDownload className="btn-icon" /> Download Brochure
            </button>
          </div>
        </div>

        <div className="product-details-container">
          {/* Specifications Table */}
          <div className="specs-section">
            <h3 className="section-title">Technical Specifications</h3>
            <div className="modern-specs-table">
              <table>
                <thead>
                  <tr>
                    <th className="header-category">Category</th>
                    <th className="header-label">Specification</th>
                    <th className="header-value">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Dimensions Row Group */}
                  <tr className="category-row">
                    <td className="category-name" rowSpan="4">
                      Dimensions
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">External</td>
                    <td className="spec-value">
                      {product.specifications.dimensions.external}
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Internal</td>
                    <td className="spec-value">
                      {product.specifications.dimensions.internal}
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Shipping</td>
                    <td className="spec-value">
                      {product.specifications.dimensions.shipping}
                    </td>
                  </tr>

                  {/* Weights Row Group */}
                  <tr className="category-row">
                    <td className="category-name" rowSpan="4">
                      Weights
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Tare Weight</td>
                    <td className="spec-value">
                      {product.specifications.weights.tare}
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Payload</td>
                    <td className="spec-value">
                      {product.specifications.weights.payload}
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Gross Weight</td>
                    <td className="spec-value">
                      {product.specifications.weights.gross}
                    </td>
                  </tr>

                  {/* Performance Row Group */}
                  <tr className="category-row">
                    <td className="category-name" rowSpan="4">
                      Performance
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Capacity</td>
                    <td className="spec-value">
                      {product.specifications.performance.capacity}
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Stackability</td>
                    <td className="spec-value">
                      {product.specifications.performance.stackability}
                    </td>
                  </tr>
                  <tr className="spec-row">
                    <td className="spec-label">Temperature Range</td>
                    <td className="spec-value">
                      {product.specifications.performance.temperature}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Description Section */}
          <div className="description-section">
            <h3 className="section-title">Product Description</h3>
            <p className="description-text">{product.description}</p>

            <div className="features-grid">
              {product.features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">
                    <span className={`icon-${feature.icon}`}></span>
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-desc">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="industries-section">
              <h4 className="industries-title">Recommended Industries</h4>
              <div className="industry-tags">
                {product.industries.map((industry, index) => (
                  <span className="industry-tag" key={index}>
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Quote Modal */}
        {showQuoteModal && (
          <div className="modal-overlay">
            <div className="quick-quote-modal">
              <button
                className="close-modal"
                onClick={() => setShowQuoteModal(false)}
              >
                <FiX size={24} />
              </button>

              <div className="modal-content">
                <div className="modal-product-info">
                  <div className="modal-image-wrapper">
                    <img
                      src={getImageUrl(product.img)}
                      alt={product.title}
                      className="modal-product-image"
                    />
                  </div>
                  <div className="modal-product-details">
                    <h3>{product.title}</h3>
                    <div className="modal-features">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="modal-feature-item">
                          <FiCheckCircle className="modal-feature-icon" />
                          <span>{feature.title}</span>
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
                      placeholder="Your full name"
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
                      placeholder="Your email address"
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
                      placeholder="Your phone number"
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
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Requirements</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any special requirements or modifications"
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

        <style jsx>{`
          :root {
            --primary: #ff6200;
            --primary-dark: #de0303;
            --secondary: #2a3547;
            --accent: #00a0e9;
            --light: #f8f9fa;
            --dark: #212529;
            --gray: #6c757d;
            --light-gray: #e9ecef;
            --white: #ffffff;
            --border-radius: 8px;
            --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
            --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            line-height: 1.6;
            color: var(--dark);
            -webkit-font-smoothing: antialiased;
          }

          .product-section {
            padding: 1rem;
            background: linear-gradient(135deg, #f9f9f9 0%, #f0f2f5 100%);
          }

          .product-container {
            display: flex;
            flex-wrap: wrap;
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
            overflow: hidden;
          }

          .product-image-container {
            flex: 1;
            min-width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .image-wrapper {
            position: relative;
            border-radius: var(--border-radius);
            overflow: hidden;
            width: 100%;
            max-width: 500px;
            height: 100%;
          }

          .product-image {
            width: 100%;
            height: auto;
            max-height: 500px;
            object-fit: contain;
            display: block;
          }

          .image-thumbnails {
            display: flex;
            gap: 0.75rem;
            width: 100%;
          }

          .thumbnail {
            flex: 1;
            cursor: pointer;
            border-radius: var(--border-radius);
            overflow: hidden;
            transition: var(--transition);
            border: 1px solid var(--light-gray);
            aspect-ratio: 1/1;
          }

          .thumbnail:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-sm);
            border-color: var(--primary);
          }

          .thumbnail-placeholder {
            width: 100%;
            height: 100%;
            background: var(--light-gray);
          }

          .product-details {
            flex: 1;
            min-width: 300px;
          }

          .product-header {
            margin-bottom: 2rem;
          }

          .product-category {
            display: inline-block;
            font-size: 0.85rem;
            color: var(--gray);
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
          }

          .product-title {
            font-size: 2.25rem;
            font-weight: 800;
            background: linear-gradient(
              90deg,
              var(--primary),
              var(--primary-dark)
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 0.75rem;
            line-height: 1.2;
          }

          .product-subtitle {
            font-size: 1.25rem;
            color: var(--secondary);
            font-weight: 500;
            margin-bottom: 1.75rem;
          }

          .product-description {
            font-size: 1rem;
            color: var(--gray);
            margin-bottom: 2.25rem;
            line-height: 1.8;
          }

          .products-feature {
            margin-bottom: 2.5rem;
          }

          .features-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--secondary);
            margin-bottom: 1.25rem;
            position: relative;
            display: inline-block;
          }

          .features-title::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 50px;
            height: 3px;
            background: var(--primary);
            border-radius: 3px;
          }

          .features-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            font-size: 1rem;
            color: var(--dark);
            margin-bottom: 0.5rem;
          }

          .feature-icon {
            color: var(--primary);
            font-size: 1.2rem;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .product-infos {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            margin-bottom: 2.5rem;
            background: var(--light);
            padding: 1rem;
            border-radius: var(--border-radius);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .info-item {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }

          .info-label {
            font-size: 0.9rem;
            color: var(--gray);
            font-weight: 500;
          }

          .info-value {
            font-size: 1rem;
            color: var(--dark);
            font-weight: 600;
          }

          .product-cta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            padding-top: 1.75rem;
            border-top: 1px solid var(--light-gray);
          }

          .product-buttons {
            display: flex;
            gap: 1.25rem;
            flex-wrap: wrap;
            width: 95%;
          }

          .primary-btn,
          .secondary-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 1rem 2rem;
            font-size: 1.05rem;
            font-weight: 600;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
            white-space: nowrap;
            flex: 1;
            min-width: 200px;
          }

          .primary-btn {
            background: linear-gradient(
              135deg,
              var(--primary),
              var(--primary-dark)
            );
            color: var(--white);
            box-shadow: 0 4px 12px rgba(255, 98, 0, 0.25);
          }

          .primary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(255, 98, 0, 0.3);
            background: linear-gradient(
              135deg,
              var(--primary-dark),
              var(--primary)
            );
          }

          .secondary-btn {
            background: var(--white);
            color: var(--primary);
            border: 2px solid var(--primary);
          }

          .secondary-btn:hover {
            background: rgba(255, 98, 0, 0.05);
            transform: translateY(-2px);
          }

          .btn-icon {
            font-size: 1.15rem;
          }

          @media (max-width: 992px) {
            .product-container {
              gap: 2rem;
            }

            .product-title {
              font-size: 2rem;
            }
          }

          @media (max-width: 768px) {
            .product-section {
              padding: 3rem 1.5rem;
            }

            .product-container {
              gap: 2.5rem;
            }

            .product-title {
              font-size: 1.75rem;
            }

            .product-subtitle {
              font-size: 1rem;
            }

            .features-list {
              grid-template-columns: 1fr;
            }

            .product-info {
              grid-template-columns: 1fr;
            }

            .product-cta {
              flex-direction: column;
              align-items: stretch;
            }

            .product-buttons {
              flex-direction: column;
              gap: 1rem;
            }

            .primary-btn,
            .secondary-btn {
              width: 95%;
            }
          }

          @media (max-width: 480px) {
            .product-section {
              padding: 2rem 1rem;
            }

            .product-title {
              font-size: 1.6rem;
            }

            .product-subtitle {
              font-size: 1rem;
            }

            .primary-btn,
            .secondary-btn {
              padding: 0.9rem 1.5rem;
              font-size: 1rem;
            }
          }
          .product-details-container {
            margin-top: 2rem;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            padding: 1rem;
            overflow: hidden;
            position: relative;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .product-details-container:hover {
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          }

          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 1.75rem;
            position: relative;
            padding-bottom: 0.75rem;
            letter-spacing: -0.5px;
          }

          .section-title::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
            border-radius: 2px;
          }

          /* Modern Specifications Table */

          .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.75rem;
          }

          .section-title::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
            border-radius: 3px;
          }

          .modern-specs-table {
            border-radius: 12px;
            overflow-x: auto; /* enables scroll on smaller screens */
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
          }

          .modern-specs-table table {
            width: 100%;
            border-collapse: collapse;
            min-width: 600px; /* ensures table structure doesn’t break on small screens */
          }

          .modern-specs-table th {
            text-align: left;
          }

          .header-category,
          .header-label,
          .header-value {
            padding: 1rem 1.5rem;
            font-weight: 600;
            color: #ffffff;
            background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
          }

          .header-category {
            width: 20%;
          }

          .header-label {
            width: 30%;
          }

          .category-row {
            background-color: #f8fafc;
          }

          .category-name {
            padding: 1rem 1.5rem;
            font-weight: 600;
            color: #2d3748;
            vertical-align: top;
            border-right: 1px solid #e2e8f0;
            background-color: #f8fafc;
          }

          .spec-row {
            transition: background-color 0.2s ease;
          }

          .spec-row:hover {
            background-color: #f8fafc;
          }

          .spec-row:nth-child(even) {
            background-color: #ffffff;
          }

          .spec-row:nth-child(even):hover {
            background-color: #f8fafc;
          }

          .spec-label {
            padding: 0.75rem 1.5rem;
            font-weight: 500;
            color: #4a5568;
            border-right: 1px solid #e2e8f0;
          }

          .spec-value {
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            color: #1a202c;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .section-title {
              font-size: 1.25rem;
            }

            .header-category,
            .header-label,
            .header-value,
            .category-name,
            .spec-label,
            .spec-value {
              padding: 0.75rem 1rem;
              font-size: 0.9rem;
            }

            .modern-specs-table {
              overflow-x: auto;
            }

            .modern-specs-table table {
              min-width: 600px;
            }
          }

          /* Description Section */
          .description-text {
            line-height: 1.8;
            color: #4a5568;
            margin-bottom: 2.5rem;
            font-size: 1.05rem;
          }

          /* Features Grid */
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
          }

          .feature-card {
            background: #ffffff;
            border-radius: 12px;
            padding: 1.75rem;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
          }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            border-color: #cbd5e0;
          }

          .feature-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 0;
            background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
            transition: height 0.3s ease;
          }

          .feature-card:hover::before {
            height: 100%;
          }

          .feature-icon {
            font-size: 2rem;
            margin-bottom: 1.25rem;
            color: #ff6200;
            transition: transform 0.3s ease;
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.1);
          }

          .feature-title {
            font-size: 1.15rem;
            margin-bottom: 0.75rem;
            color: #2d3748;
            font-weight: 600;
          }

          .feature-desc {
            font-size: 0.95rem;
            color: #4a5568;
            line-height: 1.7;
          }

          /* Industries Section */
          .industries-section {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #edf2f7;
          }

          .industries-title {
            font-size: 1.15rem;
            margin-bottom: 1.25rem;
            color: #4a5568;
            font-weight: 600;
          }

          .industry-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .industry-tag {
            background: #ebf4ff;
            color: #ff6200;
            padding: 0.6rem 1.25rem;
            border-radius: 24px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
            border: 1px solid #dbeafe;
          }

          .industry-tag:hover {
            background: rgb(255, 72, 0);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
          }

          /* Responsive */
          @media (max-width: 768px) {
            .product-details-container {
              border-radius: 12px;
            }

            .specs-row {
              flex-direction: column;
            }

            .specs-category {
              flex: 1;
              padding: 1rem;
            }

            .specs-item {
              flex-direction: row;
              gap: 0.5rem;
              flex-wrap: wrap;
            }

            .specs-label {
              min-width: 100px;
            }

            .features-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .section-title {
              font-size: 1.3rem;
            }
          }

          /* Animation Enhancements */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .specs-row,
          .feature-card,
          .industry-tag {
            animation: fadeIn 0.5s ease forwards;
            opacity: 0;
          }

          .specs-row:nth-child(1) {
            animation-delay: 0.1s;
          }
          .specs-row:nth-child(2) {
            animation-delay: 0.2s;
          }
          .specs-row:nth-child(3) {
            animation-delay: 0.3s;
          }
          .feature-card:nth-child(1) {
            animation-delay: 0.4s;
          }
          .feature-card:nth-child(2) {
            animation-delay: 0.5s;
          }
          .feature-card:nth-child(3) {
            animation-delay: 0.6s;
          }
          .industry-tag {
            animation-delay: 0.7s;
          }

          .product-meta {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1.5rem;
            padding: 1rem;
            margin-top: 2rem;
            background-color: #fff;
            border: 1px solid #eee;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex: 1 1 30%;
            min-width: 250px;
            background-color: #f9f9f9;
            padding: 1rem;
            border-radius: 10px;
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
          }

          .meta-item:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transform: translateY(-3px);
          }

          .meta-icon {
            font-size: 2rem;
            background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }

          .meta-text {
            display: flex;
            flex-direction: column;
          }

          .meta-label {
            font-size: 0.95rem;
            font-weight: 600;
            color: #333;
          }

          .meta-value {
            font-size: 0.9rem;
            color: #666;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .product-meta {
              flex-direction: column;
              gap: 1rem;
            }

            .meta-item {
              flex: 1 1 100%;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default SingleProduct;
