import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/quickfitlogo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-left">
          <img src={logo} alt="Quick Fit Logo" className="footer-logo" />
          <h2 className="footer-since">
            since <span>1962</span>
          </h2>
          <p className="footer-description">
            Quickfit is a globally recognized manufacturer of offshore
            containers and specialized machinery.
          </p>
        </div>

        {/* Middle Column */}
        <div className="footer-middle">
          <div className="footer-contact">
            <h4>Location</h4>
            <p>
              <FaMapMarkerAlt /> B 400, Oberoi Garden Business Premises,
              Chandivali Farm Road, Andheri East, Mumbai - 400072, Maharashtra,
              INDIA
            </p>
          </div>
          <div className="footer-contact">
            <h4>Phone</h4>
            <p>
              <FaPhone />{" "}
              <a href="tel:+912247510385" className="footer-link">
                +022-4751-0385
              </a>
            </p>
          </div>
          <div className="footer-contact">
            <h4>Email</h4>
            <p>
              <FaEnvelope />{" "}
              <a href="mailto:info@quickfitengg.com" className="footer-link">
                info@quickfitengg.com
              </a>
            </p>
          </div>
          <div className="footer-contact">
            <h4>Follow us</h4>
            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="footer-right">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/blogs">Blog</a>
              </li>
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Industries</h4>
            <ul>
              <li>
                <a href="/industries/oil-gas-offshore">Oil & Gas Offshore</a>
              </li>
              <li>
                <a href="/industries/offshore-containers">
                  Offshore Containers
                </a>
              </li>
              <li>
                <a href="/industries/offshore-wind-energy">
                  Offshore Wind Energy
                </a>
              </li>
              <li>
                <a href="/industries/military-defense-industries">
                  Military & Defense Industries
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
