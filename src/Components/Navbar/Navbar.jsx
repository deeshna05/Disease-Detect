import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../../Assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo" />
        <p className="logo-text">DISEASE DETECT</p>
      </div>
      <ul className="nav-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/description">Description</Link></li>
        <li><Link to="/hospitals">Hospitals</Link></li>
        <li><Link to="/symptoms">Symptoms</Link></li>
        {/* Removed My Account link */}
      </ul>
      <div className="nav-auth">
        <Link to="/login" className="auth-link">Login/Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
