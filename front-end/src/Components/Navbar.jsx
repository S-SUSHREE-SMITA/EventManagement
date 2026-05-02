import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // redirect to login after logout
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="logo">EventHub</div>

      {/* CENTER */}
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      {/* RIGHT */}
      <div className="login-section">

        {!user ? (
          <>
            {/* 🔹 Default Login button that opens dropdown */}
           <button
               className="login-btn"
                 onClick={(e) => {
                  e.stopPropagation(); // prevents instant close
                  setOpen(!open);
              }}
            >Login</button>

            {/* 🔹 Dropdown with Register + Admin */}
            {open && (
              <div className="dropdown">
                <Link to="/register">Register</Link>
                <Link to="/admin-login">Admin</Link>
              </div>
            )}
          </>
        ) : (
          <>
            {/* 🔹 Profile icon after login */}
            <div className="profile-area">
              <div 
                className="profile-btn"
                onClick={() => setOpen(!open)}
              >
                <span className="icon">👤</span>
                <span className="text">Profile</span>
              </div>

              {open && (
                <div className="dropdown">
                  <Link to="/profile">My Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;