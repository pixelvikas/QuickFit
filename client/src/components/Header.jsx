import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiArrowDownSLine,
  RiUserLine,
  RiLockLine,
  RiLeafLine,
  RiShieldUserLine,
} from "react-icons/ri";
import QuickFitLogo from "../assets/quickfitlogo.png";
import {
  RiPlanetLine,
  RiMenuLine,
  RiCloseLine,
  RiAddLine,
  RiPieChartLine,
} from "react-icons/ri";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setReportsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleReports = () => {
    setReportsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const closeAllMenus = () => {
    setMenuOpen(false);
    setReportsOpen(false);
    // Add more if needed
  };

  return (
    <>
      <div className="header-top">
        <div>
          <p>
            ISO 9000 : 2015 Certified | ISO 14001 : 2015 Certified | OHSAS 18001
            : 2015 Certified
          </p>
        </div>
        <div className="header-top-countries">
          {/* India (Hindi/English) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="India"
            title="Hindi/English"
          />

          {/* USA (English) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg"
            alt="United States"
            title="English"
          />

          {/* UK (English) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
            alt="United Kingdom"
            title="English"
          />

          {/* France (French) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
            alt="France"
            title="French"
          />

          {/* Gulf Countries (Arabic/Urdu) - Using UAE flag as representative */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg"
            alt="Gulf Countries"
            title="Arabic/Urdu"
          />

          {/* Portugal (Portuguese) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
            alt="Portugal"
            title="Portuguese"
          />

          {/* Spain (Spanish) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
            alt="Spain"
            title="Spanish"
          />

          {/* Brazil (Portuguese) */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
            alt="Brazil"
            title="Portuguese"
          />
        </div>
      </div>
      <header className="header">
        <nav className="nav container">
          <div className="nav__data">
            <a href="/" className="nav__logo">
              <img src={QuickFitLogo} alt="" />
            </a>

            <div className="nav__toggle" onClick={toggleMenu}>
              {menuOpen ? (
                <RiCloseLine className="nav__icon" />
              ) : (
                <RiMenuLine className="nav__icon" />
              )}
            </div>
          </div>

          <div className={`nav__menu ${menuOpen ? "show-menu" : ""}`}>
            <ul className="nav__list">
              <li>
                <Link to="/" className="nav__link" onClick={closeMenu}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav__link" onClick={closeMenu}>
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/products" className="nav__link" onClick={closeMenu}>
                  PRODUCT PRICING
                </Link>
              </li>
              <li
                className="dropdown__item"
                onMouseLeave={() => setReportsOpen(false)}
                onMouseEnter={() => setReportsOpen(true)}
              >
                <div className="nav__link">
                  INDUSTRIES
                  <RiArrowDownSLine className="dropdown__arrow" />
                </div>

                {reportsOpen && (
                  <ul className="dropdown__menu">
                    <li>
                      <Link
                        to="/industries/oil-gas-offshore"
                        className="dropdown__link"
                        onClick={closeAllMenus}
                      >
                        Oil &amp; Gas Offshore
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/industries/offshore-containers"
                        className="dropdown__link"
                        onClick={closeAllMenus}
                      >
                        Shipping Containers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/industries/offshore-wind-energy"
                        className="dropdown__link"
                        onClick={closeAllMenus}
                      >
                        Renewable Energy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/industries/military-defense-industries"
                        className="dropdown__link"
                        onClick={closeAllMenus}
                      >
                        Naval &amp; Defense Sectors
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link to="/blogs" className="nav__link" onClick={closeMenu}>
                  BLOGS
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="nav__link" onClick={closeMenu}>
                  GALLERY
                </Link>
              </li>
              <li className="contact-hidden">
                <Link to="/contact" className="nav__link" onClick={closeMenu}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav__data">
            <ul className="nav__hidden contact-btn">
              <li>
                <Link to="/contact" className="nav__link" onClick={closeMenu}>
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
