import React, { useState } from "react";
import product1 from "../../assets/6 ft Offshore Mini Container - 01.png";
import { FiDownload, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const SingleProduct = () => {
  const features = [
    "DNV 2.7-1 Certified",
    "Extreme weather resistant",
    "Corrosion protection",
    "Custom color options",
    "Heavy-duty construction",
    "Safety compliant",
  ];

  const [activeTab, setActiveTab] = useState("specification");

  const specificationData = [
    {
      feature: "Material",
      spec: "High-strength steel with marine-grade coating",
    },
    { feature: "Size Options", spec: "10ft / 20ft / 40ft / Custom" },
    { feature: "Weight Capacity", spec: "Up to 30,000 kg" },
    {
      feature: "Lifting Points",
      spec: "Reinforced pad eyes for offshore lifting",
    },
    {
      feature: "Customization",
      spec: "Internal shelving, insulation, ATEX compliance, ventilation",
    },
  ];

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="image-wrapper">
          <img
            src={product1}
            alt="10FT CSC/DNV OFFSHORE Container"
            className="product-image"
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
        {/* Uncomment if you want thumbnails
          <div className="image-thumbnails">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="thumbnail">
                <div className="thumbnail-placeholder"></div>
              </div>
            ))}
          </div> */}

        <div className="product-details">
          <div className="product-header">
            <span className="product-category">Offshore Containers</span>
            <h1 className="product-title">10FT CSC/DNV OFFSHORE</h1>
            <h3 className="product-subtitle">
              Certified, Durable & Built for Extreme Conditions
            </h3>
          </div>

          <p className="product-description">
            Quickfit's DNV 2.7-1 certified offshore containers are engineered
            for maximum safety, durability, and efficiency in marine, energy,
            and industrial sectors. These containers meet the highest industry
            standards for offshore operations.
          </p>

          <div className="product-feature">
            <h4 className="features-title">Key Features:</h4>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <FiCheckCircle className="feature-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="product-info">
            <div className="info-item">
              <span className="info-label">Material:</span>
              <span className="info-value">Carbon Steel</span>
            </div>
            <div className="info-item">
              <span className="info-label">Certification:</span>
              <span className="info-value">
                DNV 2.7-1, EN 12079 / ISO 10855
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Application:</span>
              <span className="info-value">
                Oil & Gas Exploration, Offshore Rig Platform
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Color:</span>
              <span className="info-value">Customizable</span>
            </div>
          </div>

          <div className="product-cta">
            <div className="product-buttons">
              <button className="primary-btn">
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
                  {[...Array(1)].map((_, tableIndex) => (
                    <div key={tableIndex} className="spec-card">
                      <table>
                        <thead>
                          <tr>
                            <th>Feature</th>
                            <th>Specification</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specificationData.map((item, index) => (
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
                  ))}
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
                    <p>
                      This premium product combines cutting-edge technology with
                      elegant design. Crafted with precision and attention to
                      detail, it offers exceptional performance and durability.
                    </p>
                    <ul className="feature-highlights">
                      <li>
                        <span className="highlight-icon">✨</span> High-quality
                        materials
                      </li>
                      <li>
                        <span className="highlight-icon">✨</span> Advanced
                        functionality
                      </li>
                      <li>
                        <span className="highlight-icon">✨</span> Eco-friendly
                        manufacturing
                      </li>
                      <li>
                        <span className="highlight-icon">✨</span> 2-year
                        warranty included
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #f9f9f9 0%, #f0f2f5 100%);
        }

        .product-container {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          background: var(--white);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          padding: 2.5rem;
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
          font-size: 1.05rem;
          color: var(--gray);
          margin-bottom: 2.25rem;
          line-height: 1.8;
        }

        .product-feature {
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

        .product-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          padding: 1.75rem;
          background: var(--light);
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
          width: 100%;
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
            padding: 2rem;
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
            padding: 1.75rem;
            gap: 2.5rem;
          }

          .product-title {
            font-size: 1.75rem;
          }

          .product-subtitle {
            font-size: 1.15rem;
          }

          .features-list {
            grid-template-columns: 1fr;
          }

          .product-info {
            grid-template-columns: 1fr;
            padding: 1.5rem;
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

          .product-container {
            padding: 1.5rem;
          }

          .product-title {
            font-size: 1.6rem;
          }

          .product-subtitle {
            font-size: 1.1rem;
          }

          .primary-btn,
          .secondary-btn {
            padding: 0.9rem 1.5rem;
            font-size: 1rem;
          }
        }
        .tabs-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
        }

        .tab-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 8px;
        }

        .tab {
          position: relative;
          padding: 12px 24px;
          background-color: transparent;
          border: none;
          color: #666;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 500;
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
          font-size: 18px;
        }

        .tab-content-wrapper {
          transition: height 0.3s ease;
        }

        .tab-content {
          animation: fadeIn 0.3s ease-out;
        }

        .spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .spec-card {
          background: #fafafa;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .spec-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        th {
          background-color: rgba(255, 92, 0, 0.05);
          color: #ff5c00;
          font-weight: 600;
          padding: 16px;
          border-bottom: 2px solid rgba(255, 92, 0, 0.1);
        }

        td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          color: #555;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .feature-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-icon {
          opacity: 0.7;
        }

        .description-card {
          background: #fafafa;
          border-radius: 12px;
          padding: 28px;
        }

        .description-card h3 {
          color: #ff5c00;
          margin-bottom: 16px;
          font-size: 1.5rem;
        }

        .description-content {
          color: #555;
          line-height: 1.6;
        }

        .feature-highlights {
          margin-top: 20px;
          padding-left: 0;
          list-style: none;
        }

        .feature-highlights li {
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .highlight-icon {
          color: #ff5c00;
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

        @media (max-width: 768px) {
          .spec-grid {
            grid-template-columns: 1fr;
          }

          .tab-buttons {
            flex-direction: column;
          }

          .tab.active::after {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default SingleProduct;
