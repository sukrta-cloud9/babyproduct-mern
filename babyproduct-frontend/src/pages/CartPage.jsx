import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  console.log("=== CartPage Loaded ===");
  const { cart, removeFromCart, updateQty, clearCart, getTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      console.log("Logged in User:", user);

      try {
        const res = await fetch(`http://localhost:5000/cart/${user._id}`);
        const data = await res.json();

        console.log("Cart from MongoDB:", data);

        setCartItems(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [user]);

  // This is only for checking that data is coming from MongoDB.
  console.log("cartItems:", cartItems);

  if (!cart || !cart.items) {
    return (
      <div className="container text-center py-5">
        <h3>Loading cart...</h3>
      </div>
    );
  }
  console.log("Cart from Context:", cart);
  if (cart.items.length === 0) {
    return (
      <div className="container text-center py-5">
        <h3>Your cart is empty 🛒</h3>
        <button
          className="cart-btn mt-3"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 pastel-heading">My Cart 🛒</h2>

      <div className="row">
        {cart.items.map((item) => (
          <div key={item.productId} className="col-md-3 mb-4">
            <div className="card shadow-sm p-2 wishlist-card">
              <img
                src={item.img}
                alt={item.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "contain" }}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="price">₹{item.price}</p>

                <div className="d-flex justify-content-center align-items-center gap-3 my-3">
                  <button
                    className="like-btn"
                    onClick={() => updateQty(item.cartId, item.qty - 1)}
                    disabled={item.qty === 1}
                  >
                    -
                  </button>

                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#f27777",
                    }}
                  >
                    {item.qty}
                  </span>

                  <button
                    className="like-btn"
                    onClick={() => updateQty(item.cartId, item.qty + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="like-btn"
                  onClick={() => removeFromCart(item.cartId)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <h4>
          Total:{" "}
          <span style={{ color: "#f27777", fontWeight: "700" }}>
            ₹{getTotal()}
          </span>
        </h4>

        <button
          className="cart-btn mt-3"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;