import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="bg-gray-800">
      <h1 className="text-center text-white">All Right Reserved &copy; 2024</h1>
      <p className="text-center text-white mt-3">
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;