import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  // Find the wishlist item for this product
  const wishlistItem = wishlist.find((item) => item.id === product._id);

  const isInWishlist = !!wishlistItem;

  const handleWishlist = () => {
    if (!user) return navigate("/login");

    if (isInWishlist) {
      removeFromWishlist(wishlistItem.wishlistId);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.image,
        rating: product.rating,
        offer: product.offer,
      });
    }
  };

  const handleAddToCart = () => {
    if (!user) return navigate("/login");

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      img: product.image,
      rating: product.rating,
      offer: product.offer,
    });
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">

        <div className="col-md-6 text-center">
          <img
            src={product.image || product.img}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>

          <h4 className="price">₹{product.price}</h4>

          <div className="rating mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < Math.round(product.rating) ? "#FFD700" : "#E0E0E0"}
              />
            ))}
          </div>

          <p className="mb-4">{product.description}</p>

          <div className="actions d-flex gap-3">
            <button className="like-btn" onClick={handleWishlist}>
              <FaHeart color={isInWishlist ? "red" : "#f27777"} /> Wishlist
            </button>

            <button className="cart-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}