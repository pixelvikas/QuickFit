import React from "react";
import logo from "../assets/quickfitlogo.svg";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="logo-loader-container">
        <img className="logo-loader" src={logo} alt="Loading..." />
      </div>
    </div>
  );
};

export default LoadingPage;
