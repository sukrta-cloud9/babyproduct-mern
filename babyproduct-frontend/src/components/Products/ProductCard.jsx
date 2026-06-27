import React from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Products.css";

const ProductCard = ({ id, name, price, img, rating, offer }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const isInWishlist = user ? wishlist.some((item) => item.id === id) : false;

  const handleWishlist = () => {
    if (!user) return navigate("/login");

    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, img, rating, offer });
    }
  };

  const handleAddToCart = () => {
    if (!user) return navigate("/login");

    addToCart({
      id,
      name,
      price,
      img,
      rating,
      offer,
      quantity: 1,
    });
  };

  const handleView = () => {
    console.log("Navigating to:", id);
    navigate(`/product/${id}`);
    
  };
  console.log("Product image path:", img);

  return (
    <div className="product-card">
      {offer && <span className="offer-badge">{offer}</span>}

      <img src={img} alt={name} />

      <h5>{name}</h5>
      <p className="price">{price}</p>

      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            color={i < Math.round(rating) ? "#FFD700" : "#E0E0E0"}
          />
        ))}
      </div>

      <div className="actions">
        <button className="like-btn" onClick={handleWishlist}>
          <FaHeart color={isInWishlist ? "red" : "#f27777"} />
        </button>

        <button className="cart-btn" onClick={handleAddToCart}>
          <FaShoppingCart /> Add to Cart
        </button>

        
        <button className="like-btn" onClick={handleView}>
          View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
