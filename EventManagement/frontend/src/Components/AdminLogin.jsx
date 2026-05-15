import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Form.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      login(res.data.user, res.data.token);
      toast.success("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-wrapper admin-form">
        <div className="welcome-panel admin-panel">
          <div className="welcome-content">
            <h1>Admin Portal</h1>
            <p>Secure access for EventHub administrators only.</p>
            {/* <div className="welcome-art">🔐</div> */}
          </div>
        </div>

        <div className="form-box">
          <div className="form-header">
            <h2>Admin Login</h2>
            <p>Enter admin credentials to access dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Admin Email</label>
              <input type="email" placeholder="admin@eventhub.in" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Admin password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn admin-submit" disabled={loading}>
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
