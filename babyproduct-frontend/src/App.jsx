import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products"; 
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin"; 
import Register from "./pages/Register";  
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetails from "./pages/ProductDetails";
import OrdersPage from "./pages/OrdersPage";



function App() {
  return (
    <>
      
      <Routes>
        <Route
          path="/admin/*"
          element={<AdminDashboard />}
        />

        
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/orders" element={<OrdersPage />} />


              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;