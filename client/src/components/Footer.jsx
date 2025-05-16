import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/quickfitlogo.png";

import { FaXTwitter } from "react-icons/fa6";

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
            <h4>India</h4>
            <p>
              <FaMapMarkerAlt /> quickfit, andheri
            </p>
          </div>
          <div className="footer-contact">
            <h4>Phone</h4>
            <p>
              <FaPhone /> +022-22334455
            </p>
          </div>
          <div className="footer-contact">
            <h4>Follow us</h4>
            <div className="footer-socials">
              <FaInstagram />
              <FaFacebookF />
              <FaXTwitter />
            </div>
          </div>
          <div className="footer-contact">
            <h4>Email</h4>
            <p>
              <FaEnvelope /> Info@quickfit.com
            </p>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Products</li>
              <li>Services</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Industries</h4>
            <ul>
              <li>Oil & Gas Offshore</li>
              <li>Marine & Subsea</li>
              <li>Renewable Energy</li>
              <li>Naval & Defense</li>
              <li>
                <a href="#">Explore All</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
