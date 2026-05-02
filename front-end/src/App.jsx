import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Services from "./Components/Services";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

import Login from "./Components/Login";
import Register from "./Components/Register";
import AdminLogin from "./Components/AdminLogin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={
          <>
            <section id="home">
              <Home />
            </section>

            <section id="services">
              <div className="container">
                <Services />
              </div>
            </section>

            <section id="about">
              <div className="container">
                <About />
              </div>
            </section>

            <section id="contact">
              <div className="container">
                <Contact />
              </div>
            </section>
          </>
        }/>

        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />

      </Routes>

      <Footer/>

    </Router>
  );
}

export default App;




