import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar-custom">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon"></span> EventHub
        </Link>

        {/* HAMBURGER */}
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>

        {/* CENTER LINKS */}
        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          <a href="/#home" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="/#services" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="/#about" onClick={() => setMobileOpen(false)}>About</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          {user?.role === "admin" && (
            <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          )}
        </div>

        {/* RIGHT */}
        <div className="nav-auth" ref={dropdownRef}>
          {!user ? (
            <>
              <button className="btn-login" onClick={() => setDropdownOpen(!dropdownOpen)}>
                Login / Register
              </button>
              {dropdownOpen && (
                <div className="auth-dropdown">
                  <Link to="/login" onClick={() => setDropdownOpen(false)}>
                    <span>👤</span> User Login
                  </Link>
                  <Link to="/register" onClick={() => setDropdownOpen(false)}>
                    <span>📝</span> Register
                  </Link>
                  <Link to="/admin-login" onClick={() => setDropdownOpen(false)}>
                    <span>🔐</span> Admin Login
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <button className="btn-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="avatar">{user.name?.charAt(0).toUpperCase()}</span>
                <span className="profile-name">{user.name?.split(" ")[0]}</span>
                <span className="arrow">▾</span>
              </button>
              {dropdownOpen && (
                <div className="auth-dropdown">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    <span>👤</span> My Profile
                  </Link>
                  <Link to="/profile?tab=bookings" onClick={() => setDropdownOpen(false)}>
                    <span>📋</span> My Bookings
                  </Link>
                  {user.role === "admin" && (
                    <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)}>
                      <span>📊</span> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
