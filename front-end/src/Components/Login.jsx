import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Axios POST request
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });

      // ✅ Successful login
      alert("Login Successful");

      // Save user info / token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect to main page
      navigate("/");

    } catch (error) {
      // ✅ Handle errors
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>User Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

      </div>
    </div>
  );
}

export default Login;