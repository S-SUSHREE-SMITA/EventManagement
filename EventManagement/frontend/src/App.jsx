import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Services from "./Components/Services";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminLogin from "./Components/AdminLogin";
import ServiceDetail from "./Pages/ServiceDetail";
import BookingPage from "./Pages/BookingPage";
import Profile from "./Pages/Profile";
import AdminDashboard from "./Pages/AdminDashboard";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main landing page */}
        <Route
          path="/"
          element={
            <>
              <section id="home"><Home /></section>
              <section id="services" className="py-5"><div className="container"><Services /></div></section>
              <section id="about" className="py-5"><div className="container"><About /></div></section>
              <section id="contact" className="py-5"><div className="container"><Contact /></div></section>
            </>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Service Detail (requires login) */}
        <Route path="/services/:serviceSlug" element={<PrivateRoute><ServiceDetail /></PrivateRoute>} />

        {/* Booking (requires login) */}
        <Route path="/booking/:serviceSlug/:venueId" element={<PrivateRoute><BookingPage /></PrivateRoute>} />

        {/* Profile (requires login) */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* Admin Dashboard (requires admin role) */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
