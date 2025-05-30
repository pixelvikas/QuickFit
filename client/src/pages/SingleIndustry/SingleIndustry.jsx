import React, { useState } from "react";
import { useParams } from "react-router-dom";
import industryData from "../../industries.json";
import productData from "../../productsData.json";
import { useNavigate } from "react-router-dom";
import c1 from "../../assets/cert1.png";
import c2 from "../../assets/cert2.png";
import c3 from "../../assets/cert3.png";
import c4 from "../../assets/cert4.png";

import i1 from "../../assets/oil&gas.png";
import i2 from "../../assets/shipping.png";
import i3 from "../../assets/renewable.png";
import i4 from "../../assets/naval.png";
import { FaArrowRightLong } from "react-icons/fa6";

// React icons
import { FiStar } from "react-icons/fi";

// Utility function to get complete image URL
const getImageUrl = (imageName) => {
  return new URL(`../../assets/${imageName}`, import.meta.url).href;
};

// Predefined industry background images
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

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const industry = industryData.find(
    (ind) => slugify(ind.industryName) === indName
  );

  if (!industry) {
    return <div className="single-industry">Industry not found.</div>;
  }

  // Get background image URL
  const backgroundImageUrl =
    INDUSTRY_BACKGROUNDS[industry.backgroundImage] || "";

  // Filter products relevant to this industry
  const filteredProducts = productData.products.filter((product) =>
    product.industries.includes(industry.industryName)
  );

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const viewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };
  const allIndustries = [
    { image: i1, label: "Oil & Gas Offshore" },
    { image: i2, label: "Shipping Containers" },
    { image: i3, label: "Renewable Energy" },
    { image: i4, label: "Naval & Defense Sectors" },
  ];

  const filteredIndustries = allIndustries.filter(
    (ind) => slugify(ind.label) !== indName
  );
  return (
    <>
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
                e.target.onerror = null;
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
                          e.target.onerror = null;
                          e.target.src = getImageUrl("product-placeholder.png");
                        }}
                      />
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
                      <p className="product-description">
                        {product.description}
                      </p>

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
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getImageUrl("product-placeholder.png");
                      }}
                    />
                  </div>
                </div>
                <div className="modal-details">
                  <h2>{quickViewProduct.title}</h2>
                  <p className="product-category">
                    {quickViewProduct.category}
                  </p>
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
      </div>

      <div className="certification-container">
        <img src={c1} alt="DNV ISO 9001 Certification" />
        <img src={c2} alt="ABS Certification" />
        <img src={c3} alt="Bureau Veritas Certification" />
        <img src={c4} alt="Lloyd's Register Certification" />
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
  max-width: 900px;
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
    </>
  );
};

export default SingleIndustry;
