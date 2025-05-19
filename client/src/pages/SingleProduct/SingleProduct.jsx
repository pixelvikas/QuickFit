import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiDownload, FiArrowRight, FiCheckCircle, FiX } from "react-icons/fi";
import productsData from "../../productsData.json";

const SingleProduct = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("specification");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    message: "",
  });

  useEffect(() => {
    // Find the product with matching ID
    const foundProduct = productsData.products.find(
      (p) => p.id === parseInt(id)
    );

    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      setError("Product not found");
      setLoading(false);
    }
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

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    } catch (e) {
      console.error("Image not found:", imageName);
      return new URL(`../../assets/placeholder-image.png`, import.meta.url)
        .href;
    }
  };

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
            <h3 className="product-subtitle">
              Certified, Durable & Built for Extreme Conditions
            </h3>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="products-feature">
            <h4 className="features-title">Key Features:</h4>
            <ul className="features-list">
              {product.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <FiCheckCircle className="feature-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="product-infos">
            <div className="info-item">
              <span className="info-label">Lead Time:</span>
              <span className="info-value">{product.leadTime}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Capacity:</span>
              <span className="info-value">{product.capacity}</span>
            </div>
          </div>

          <div className="product-cta">
            <div className="product-buttons">
              <button
                className="primary-btn"
                onClick={() => setShowQuoteModal(true)}
              >
                Get Instant Quote <FiArrowRight className="btn-icon" />
              </button>
              <button className="secondary-btn">
                <FiDownload className="btn-icon" /> Brochure
              </button>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tab-buttons">
            <button
              className={`tab ${activeTab === "specification" ? "active" : ""}`}
              onClick={() => setActiveTab("specification")}
              aria-selected={activeTab === "specification"}
              aria-controls="specification-content"
            >
              <span className="tab-icon">📋</span>
              <span>Specification</span>
            </button>
            <button
              className={`tab ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
              aria-selected={activeTab === "description"}
              aria-controls="description-content"
            >
              <span className="tab-icon">📝</span>
              <span>Description</span>
            </button>
          </div>

          <div className="tab-content-wrapper">
            {activeTab === "specification" && (
              <div
                id="specification-content"
                className="tab-content active"
                role="tabpanel"
                aria-labelledby="specification-tab"
              >
                <div className="spec-grid">
                  <div className="spec-card">
                    {product.specifications &&
                    product.specifications.length > 0 ? (
                      <div className="responsive-table">
                        <table className="spec-table">
                          <thead>
                            <tr>
                              <th>Feature</th>
                              <th>Specification</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.specifications.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="feature-cell">
                                    <span className="feature-icon">⚙️</span>
                                    <span>{item.feature}</span>
                                  </div>
                                </td>
                                <td>{item.spec}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="no-specs">
                        No specifications available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "description" && (
              <div
                id="description-content"
                className="tab-content active"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                <div className="description-card">
                  <h3>Product Details</h3>
                  <div className="description-content">
                    <p>{product.description}</p>
                    {product.features && product.features.length > 0 && (
                      <ul className="feature-highlights">
                        {product.features.map((feature, index) => (
                          <li key={index}>
                            <span className="highlight-icon">✨</span> {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Quote Modal */}
      {showQuoteModal && product && (
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
                    {product.features.slice(0, 3).map((feature, index) => (
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
          padding: 0.5rem;
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
            width: 100%;
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
        .tabs-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1.5rem;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        }

        .tab-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 8px;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .tab-buttons::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .tab {
          position: relative;
          padding: 0.75rem 1.5rem;
          background-color: transparent;
          border: none;
          color: #666;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .tab:hover {
          background-color: rgba(255, 92, 0, 0.08);
          color: #ff5c00;
        }

        .tab.active {
          background-color: rgba(255, 92, 0, 0.1);
          color: #ff5c00;
          font-weight: 600;
        }

        .tab.active::after {
          content: "";
          position: absolute;
          bottom: -9px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #ff5c00;
          border-radius: 3px 3px 0 0;
        }

        .tab-icon {
          font-size: 1.1rem;
        }

        .tab-content-wrapper {
          transition: height 0.3s ease;
        }

        .tab-content {
          animation: fadeIn 0.3s ease-out;
        }

        .spec-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1.5rem;
        }

        .spec-card {
          background: #fafafa;
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }

        .spec-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .responsive-table {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 600px;
        }

        th {
          background-color: rgba(255, 92, 0, 0.05);
          color: #ff5c00;
          font-weight: 600;
          padding: 1rem;
          border-bottom: 2px solid rgba(255, 92, 0, 0.1);
          text-align: left;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          color: #555;
          vertical-align: top;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .feature-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .feature-icon {
          opacity: 0.7;
        }

        .description-card {
          background: #fafafa;
          border-radius: 12px;
          padding: 1.75rem;
        }

        .description-card h3 {
          color: #ff5c00;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .description-content {
          color: #555;
          line-height: 1.6;
        }

        .description-content p {
          margin-bottom: 1.5rem;
        }

        .feature-highlights {
          margin-top: 1.25rem;
          padding-left: 0;
          list-style: none;
        }

        .feature-highlights li {
          padding: 0.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
        }

        .highlight-icon {
          color: #ff5c00;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .no-specs {
          padding: 1.5rem;
          text-align: center;
          color: #777;
        }

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

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .tabs-container {
            padding: 1.25rem;
            margin: 1.5rem auto;
          }

          .description-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .tab-buttons {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tab {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .tab.active::after {
            display: none;
          }

          .spec-card {
            padding: 1rem;
          }

          th,
          td {
            padding: 0.75rem;
          }

          .description-card {
            padding: 1.25rem;
          }

          .description-card h3 {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .tabs-container {
            padding: 1rem;
            margin: 1rem auto;
            border-radius: 12px;
          }

          .tab {
            flex: 1 0 calc(50% - 0.5rem);
            justify-content: center;
          }

          .description-card {
            padding: 1rem;
          }

          .description-content p {
            font-size: 0.95rem;
          }

          .feature-highlights li {
            font-size: 0.9rem;
          }
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease-out;
        }

        .quick-quote-modal {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          animation: slideUp 0.3s ease-out;
        }

        .close-modal {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--gray);
          transition: var(--transition);
        }

        .close-modal:hover {
          color: var(--primary);
          transform: rotate(90deg);
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          padding: 40px;
        }

        .modal-product-info {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--light-gray);
        }

        .modal-image-wrapper {
          width: 200px;
          height: 200px;
          border-radius: var(--border-radius);
          overflow: hidden;
          flex-shrink: 0;
        }

        .modal-product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-product-details {
          flex: 1;
        }

        .modal-product-details h3 {
          font-size: 1.5rem;
          color: var(--secondary);
          margin-bottom: 15px;
        }

        .modal-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .modal-feature-icon {
          color: var(--primary);
          font-size: 1rem;
        }

        .quote-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .quote-form h3 {
          grid-column: 1 / -1;
          font-size: 1.4rem;
          color: var(--secondary);
          margin-bottom: 10px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--gray);
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 15px;
          border: 1px solid var(--light-gray);
          border-radius: var(--border-radius);
          font-size: 1rem;
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(255, 98, 0, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .submit-quote-btn {
          grid-column: 1 / -1;
          background: linear-gradient(
            135deg,
            var(--primary),
            var(--primary-dark)
          );
          color: white;
          border: none;
          padding: 15px;
          border-radius: var(--border-radius);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: var(--transition);
          margin-top: 10px;
        }

        .submit-quote-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 98, 0, 0.3);
          background: linear-gradient(
            135deg,
            var(--primary-dark),
            var(--primary)
          );
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .modal-product-info {
            flex-direction: column;
          }

          .modal-image-wrapper {
            width: 100%;
            height: 150px;
          }

          .quote-form {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 25px;
          }

          .quick-quote-modal {
            width: 95%;
          }
        }
      `}</style>
    </section>
  );
};

export default SingleProduct;
