import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div 
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="success"
        style={{ width: "120px", marginBottom: "20px" }}
      />

      <h2 style={{ color: "#f27777", fontWeight: "700" }}>
        Payment Successful!
      </h2>

      <p className="text-muted mb-4">
        Thank you for shopping with BabyBay 💗
      </p>

      

      <Link to="/products" className="btn btn-outline-danger mt-2">
        Continue Shopping
      </Link>
    </div>
  );
}
