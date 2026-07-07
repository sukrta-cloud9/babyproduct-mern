import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.wishlistId);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container text-center py-5">
        <h3>Your wishlist is empty 💔</h3>

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
      <h2 className="text-center mb-4">My Wishlist ❤️</h2>

      <div className="row">
        {wishlist.map((item) => {
          const imageUrl = item.img.startsWith("/uploads")
            ? `http://localhost:5000${item.img}`
            : item.img;

          return (
            <div key={item.id} className="col-md-3 mb-4">
              <div className="card shadow-sm p-2 wishlist-card">
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                  }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title">{item.name}</h5>

                  <p className="price">₹{item.price}</p>

                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button
                      className="cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>

                    <button
                      className="like-btn"
                      onClick={() =>
                        removeFromWishlist(item.wishlistId)
                      }
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;