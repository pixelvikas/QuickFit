import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import industryData from "../../industries.json";
import productData from "../../productsData.json";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiStar, FiX, FiCheckCircle } from "react-icons/fi";

import c1 from "../../assets/cert1.png";

import i1 from "../../assets/oil&gas.png";
import i2 from "../../assets/shipping.png";
import i3 from "../../assets/renewable.png";
import i4 from "../../assets/naval.png";

// Utility to get asset image URLs
const getImageUrl = (imageName) => {
  try {
    return new URL(`../../assets/${imageName}`, import.meta.url).href;
  } catch {
    return "";
  }
};

// Backgrounds mapping
const INDUSTRY_BACKGROUNDS = {
  "industry1bg.png": getImageUrl("industry1bg.png"),
  "industry2bg.png": getImageUrl("industry2bg.png"),
  "industry3bg.png": getImageUrl("industry3bg.png"),
  "industry4bg.png": getImageUrl("industry4bg.png"),
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const SingleIndustry = () => {
  const { indName } = useParams();
  const navigate = useNavigate();

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openQuoteModal = (product) => {
    setCurrentProduct(product);
    setShowQuoteModal(true);
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    console.log("Quote submitted:", formData, "For product:", currentProduct);
    setShowQuoteModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      quantity: 1,
      message: "",
    });
  };

  const industry = industryData.find(
    (ind) => slugify(ind.industryName) === indName
  );

  if (!industry) {
    return <div className="single-industry">Industry not found.</div>;
  }

  const backgroundImageUrl =
    INDUSTRY_BACKGROUNDS[industry.backgroundImage] || "";

  const filteredProducts = productData.products.filter((product) =>
    product.industries.includes(industry.industryName)
  );

  const viewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  const allIndustries = [
    { image: i1, label: "Oil & Gas Offshore" },
    { image: i2, label: "Offshore Containers" },
    { image: i3, label: "Offshore Wind Energy" },
    { image: i4, label: "Military & Defense Industries" },
  ];

  const filteredIndustries = allIndustries.filter(
    (ind) => slugify(ind.label) !== indName
  );

  return (
    <div className="single-industry">
      <div className="industry-header">
        <h1 className="industry-title">{industry.industryName}</h1>
        <p className="industry-subtitle">{industry.subtitle}</p>
      </div>

      <div className="industry-image-wrapper">
        {backgroundImageUrl ? (
          <img
            src={backgroundImageUrl}
            alt={industry.industryName}
            className="industry-image"
            onError={(e) => {
              e.target.src = getImageUrl("placeholder-image.png");
            }}
          />
        ) : (
          <p>Image not found.</p>
        )}
      </div>

      <div className="industry-description">
        <p>{industry.description}</p>
      </div>

      <div className="product-box">
        <h2 className="section-title">
          <span className="orange">#</span>RELATED PRODUCTS
        </h2>
        <div className="products-content">
          <div className="products-header">
            <h2>
              Products for {industry.industryName}
              <span> ({filteredProducts.length} products)</span>
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <h3>No related products found</h3>
              <p>We couldn't find any products related to this industry.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image-container">
                    <img
                      src={getImageUrl(product.img)}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = getImageUrl("product-placeholder.png");
                      }}
                    />
                    <button
                      className="quick-view-btn"
                      onClick={() => openQuoteModal(product)}
                    >
                      Quick View
                    </button>
                  </div>

                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">
                      {product.shortDescription}
                    </p>

                    <div className="product-features">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="feature-tag">
                          {feature.title}
                        </span>
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

      {/* Quote Modal */}
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
                  <p className="product-category">{currentProduct.category}</p>
                  <div className="modal-features">
                    {currentProduct.features
                      .slice(0, 3)
                      .map((feature, index) => (
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
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
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
                    placeholder="Please specify any special requirements"
                  />
                </div>

                <button type="submit" className="submit-quote-btn">
                  Submit Quote Request <FaArrowRightLong className="btn-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="certification-container">
        <img src={c1} alt="DNV ISO 9001 Certification" />
      </div>

      <div className="product-box">
        <h2 className="section-title">
          <span className="orange">#</span>OTHER INDUSTRIES
        </h2>
        <div className="industry-grid">
          {filteredIndustries.map((industry, index) => (
            <div
              className="industry-card"
              key={index}
              onClick={() => navigate(`/industries/${slugify(industry.label)}`)}
            >
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
        <style>
          {`
          .single-industry {
  max-width: 1100px;
  margin: auto;
  padding: 1rem;
  color: #333;
}

.industry-header {
  text-align: left;
  margin-bottom: 20px;
}

.industry-title {
  font-size: 28px;
  background: linear-gradient(90deg, #ff6200 0%, #de0303 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 6px;
}

.industry-subtitle {
  font-size: 16px;
  color: #666;
}

.industry-image-wrapper {
  margin: 20px 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.industry-image {
  width: 100%;
  height: auto;
  display: block;
}

.industry-description {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
}

.product-box {
  padding: 1rem 0;
  max-width: 1200px;
  margin: auto;
}

.section-title {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-bottom: 30px;
}

.industry-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.industry-card {
  width: 220px;
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
}

.underline {
  width: 40px;
  height: 2px;
  background-color: #f15a24;
  margin: 6px auto 0;
}
`}
        </style>
      </div>
    </div>
  );
};

export default SingleIndustry;
