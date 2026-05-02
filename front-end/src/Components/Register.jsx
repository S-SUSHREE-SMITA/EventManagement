import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.status === 201) {
      alert("Registered Successfully");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert(data.message);
    }
  };

  return (
  <div className="form-container">
    
     <div className="form-wrapper">

      {/* LEFT SIDE PANEL */}
      <div className="welcome-panel">
        <h1>Hello, Friend!</h1>
        <p>
          Enter your personal details and start your journey with us
        </p>
      </div>
      {/* RIGHT FORM */}
      <div className="form-box">

        <h2>User Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  </div>
);
}

export default Register;