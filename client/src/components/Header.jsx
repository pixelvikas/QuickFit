import React, { useState } from "react";
import { Link } from "react-router-dom";

import QuickFitLogo from "../assets/quickfitlogo.png";
import {
  RiPlanetLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiAddLine,
  RiPieChartLine,
  RiArrowUpDownLine,
} from "react-icons/ri";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Controls main menu
  const [reportsOpen, setReportsOpen] = useState(false); // Controls Tools dropdown

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleReports = () => {
    setReportsOpen((prev) => !prev);
  };

  return (
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
              <Link to="/" className="nav__link">
                HOME
              </Link>
            </li>

            <li>
              <Link to="/about" className="nav__link">
                ABOUT US
              </Link>
            </li>

            <li>
              <Link to="/services" className="nav__link">
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="/team" className="nav__link">
                OUR TEAM
              </Link>
            </li>
            <li className="contact-hidden">
              <Link to="/contact" className="nav__link">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav__data">
          <ul className="nav__hidden contact-btn">
            <li>
              <Link to="/contact" className="nav__link">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
