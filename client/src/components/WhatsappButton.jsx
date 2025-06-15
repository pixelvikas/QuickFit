// WhatsAppButton.jsx
import React from "react";
import PropTypes from "prop-types";

const WhatsAppButton = ({ phoneNumber, size = 50, iconUrl }) => {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`; // clean phone number (digits only)
  const defaultIcon =
    "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

  return (
    <a
      href={whatsappLink}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        display: "inline-block",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        src={iconUrl || defaultIcon}
        alt="Chat on WhatsApp"
        className="whatsapp-icon"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        loading="lazy"
      />
    </a>
  );
};

WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  size: PropTypes.number, // optional size prop
  iconUrl: PropTypes.string, // optional custom icon URL
};

export default WhatsAppButton;
