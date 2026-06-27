import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const isStrongPassword = (password) => {
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);
    const result = await register({ name, email, password });
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Registration failed");
      return;
    }

    
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: 380, borderRadius: 12 }}>
        <h3 className="text-center mb-3" style={{ color: "#f27777" }}>
          Create an account
        </h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
            <small className="text-muted">
              Password must be 8+ chars, include uppercase, lowercase, number & special char
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="Re-enter password"
            />
          </div>

          {error && <p className="text-danger small">{error}</p>}

          <button
            type="submit"
            className="btn w-100 mt-2"
            style={{ background: "#f27777", color: "white" }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
