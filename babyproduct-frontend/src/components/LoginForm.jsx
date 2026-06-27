import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ role: defaultRole = "user" }) => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(defaultRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // REGISTER
    if (!isLogin) {
      if (!name.trim()) {
        return setError("Name is required");
      }

      if (password !== confirmPassword) {
        return setError("Passwords do not match");
      }

      if (password.length < 6) {
        return setError("Password must be at least 6 characters");
      }

      const result = await register({
        name,
        email,
        password,
      });

      if (!result.success) {
        return setError(result.message);
      }

      alert("Registration successful! Please login.");

      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      return;
    }

    // LOGIN
    const result = await login(email, password);

    console.log("RESULT :", result);

    if (result.success) {
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setError(result.message || "Invalid email or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-5 shadow-lg text-center"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "25px",
          background: "linear-gradient(to bottom, #FEC8D8, #C6E2E9)",
          border: "none",
        }}
      >
        <h2
          style={{
            color: "#f27777",
            fontFamily: "Quicksand, sans-serif",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {isLogin ? "Welcome Back!" : "Join BabyBay"}
        </h2>

        <p
          style={{
            color: "#777",
            marginBottom: "25px",
            fontSize: "0.95rem",
          }}
        >
          {isLogin
            ? "Sign in to continue shopping"
            : "Create your account in seconds"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                style={{
                  borderRadius: "15px",
                  padding: "12px",
                }}
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "15px",
                padding: "12px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "15px",
                padding: "12px",
              }}
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  borderRadius: "15px",
                  padding: "12px",
                }}
              />
            </div>
          )}

          {isLogin && (
            <div className="mb-4 text-start">
              <label className="me-4">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                />{" "}
                <span style={{ color: "#f27777" }}>User</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                />{" "}
                <span style={{ color: "#f27777" }}>Admin</span>
              </label>
            </div>
          )}

          {error && (
            <p className="text-danger fw-bold small mb-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              background: "#f27777",
              color: "white",
              borderRadius: "30px",
              padding: "14px",
              fontSize: "1.1rem",
              border: "none",
            }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p
          className="mt-4"
          style={{ fontSize: "0.95rem" }}
        >
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
            style={{
              color: "#f27777",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Create one" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;