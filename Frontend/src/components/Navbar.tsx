
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      {/* Left Section - Logo */}
      <div className="navbar-left">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/Logo.png"
            alt="Hey Mahajiban Logo"
            className="navbar-logo"
          />
        </Link>
        {/* Toggler for mobile view */}
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
      </div>

      {/* Right Section - Links */}
      <div className="navbar-right">
        <Link className="nav-link text-nav" to="/">
          <b>Home</b>
        </Link>
        <Link className="nav-link btn-nav" to="/signin">
          <b>Sign In</b>
        </Link>
        <Link className="nav-link btn-nav" to="/signup">
          <b>Sign Up</b>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
