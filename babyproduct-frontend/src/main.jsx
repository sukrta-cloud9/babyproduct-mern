import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";


import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
