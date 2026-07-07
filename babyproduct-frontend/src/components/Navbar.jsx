import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();

  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  const [cartBump, setCartBump] = useState(false);
  const [wishBump, setWishBump] = useState(false);

  useEffect(() => {
    if (getCartCount() > 0) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 200);
    }
  }, [getCartCount()]);

  useEffect(() => {
    if (getWishlistCount() > 0) {
      setWishBump(true);
      setTimeout(() => setWishBump(false), 200);
    }
  }, [getWishlistCount()]);

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        height: "80px",
        background: "linear-gradient(to right, #FEC8D8, #C6E2E9)",
        position:"relative",
        zIndex:1000,
      }}
    >
      <div className="container-fluid">
        
        <Link
          to="/"
          className="position-absolute top-50 start-50 translate-middle"
          style={{ textDecoration: "none" }}
        >
      

      <img
        src="/logo.svg"
        alt="BabyBay Logo"
        className="d-block "
        style={{ height: "205px", width: "215px", objectFit: "contain" }}
      />

        </Link>

        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarNav"
        style={{
          backgroundColor:"FEC8D8",
          padding:"10px",
          borderRadius:"10px",
        }}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/Home">
                <i
                  className="bi bi-house"
                  title="Home"
                  style={{ fontSize: "1.3rem", color: "rgb(244, 119, 119)" }}
                ></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/products">
                <i
                  className="bi bi-bag"
                  title="Products"
                  style={{ fontSize: "1.3rem", color: "rgb(244, 119, 119)" }}
                ></i>
              </Link>
            </li>

            
            <li className="nav-item position-relative">
              <Link className="nav-link fw-semibold" to="/cart">
                <i
                  className={`bi bi-cart ${cartBump ? "bump" : ""}`}
                  title="Cart"
                  style={{ fontSize: "1.5rem", color: "rgb(244, 119, 119)" }}
                ></i>

                {getCartCount() > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      background: "#f27777",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </li>

            
            <li className="nav-item position-relative">
              <Link className="nav-link fw-semibold" to="/wishlist">
                <i
                  className={`bi bi-heart-fill ${wishBump ? "bump" : ""}`}
                  title="Wishlist"
                  style={{ fontSize: "1.3rem", color: "rgb(244, 119, 119)" }}
                ></i>

                {getWishlistCount() > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      background: "#f27777",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
            </li>

            
            {!user && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/login">
                  <i
                    className="bi bi-person"
                    title="Login"
                    style={{
                      fontSize: "1.3rem",
                      color: "rgb(244, 119, 119)",
                    }}
                  ></i>
                </Link>
              </li>
            )}
            
            {user && user.role === "user" && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/profile">
                  <i
                    className="bi bi-person-circle"
                    title="My Account"
                    style={{
                      fontSize: "1.3rem",
                      color: "rgb(244, 119, 119)",
                    }}
                  ></i>
                </Link>
              </li>
            )}

            
            {user && user.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/admin">
                  <i
                    className="bi bi-speedometer2"
                    title="Admin Dashboard"
                    style={{
                      fontSize: "1.3rem",
                      color: "rgb(244, 119, 119)",
                    }}
                  ></i>
                </Link>
              </li>
            )}

            
            {user && (
              <li className="nav-item">
                <button
                  className="nav-link fw-semibold bg-transparent border-0"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="bi bi-box-arrow-right"
                    title="Logout"
                    style={{
                      fontSize: "1.3rem",
                      color: "rgb(244, 119, 119)",
                    }}
                  ></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
