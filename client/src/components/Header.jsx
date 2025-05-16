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
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleReports = () => {
    setReportsOpen((prev) => !prev);
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
          {/* Most Known */}
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="India"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg"
            alt="United States"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
            alt="France"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
            alt="Spain"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"
            alt="Netherlands"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
            alt="Australia"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"
            alt="Portugal"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg"
            alt="Norway"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg"
            alt="United Arab Emirates"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg"
            alt="Malaysia"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg"
            alt="Thailand"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
            alt="Vietnam"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg"
            alt="Oman"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg"
            alt="Kuwait"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg"
            alt="Qatar"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg"
            alt="Palestine"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg"
            alt="Brazil"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg"
            alt="Mexico"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
            alt="Nigeria"
          />

          {/* Less Known */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg"
            alt="Angola"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg"
            alt="Mozambique"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg"
            alt="Namibia"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg"
            alt="Cote d'Ivoire"
          />
          <img
            src="http://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg"
            alt="Brunei"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg"
            alt="Guyana"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg"
            alt="Suriname"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg"
            alt="Trinidad and Tobago"
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
                <Link
                  to="/"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  PRODUCTS
                </Link>
              </li>
              <li>
                <Link
                  to="/industries"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  INDUSTRIES
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  BLOGS
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  GALLERY
                </Link>
              </li>
              <li className="contact-hidden">
                <Link
                  to="/contact"
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav__data">
            <ul className="nav__hidden contact-btn">
              <li>
                <Link to="/contact" className="nav__link">
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
