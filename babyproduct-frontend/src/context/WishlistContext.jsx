import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  
  const fetchWishlist = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:5000/wishlist/${user._id}`
      );

      const data = await res.json();

      const items = data.map((item) => ({
        wishlistId: item._id,
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        img: item.product.image,
        rating: item.product.rating,
        offer: item.product.offer,
      }));

      setWishlist(items);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  
  const addToWishlist = async (product) => {
    if (!user) return;

    try {
      await fetch("http://localhost:5000/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product.id,
        }),
      });

      fetchWishlist();

    } catch (err) {
      console.log(err);
    }
  };

  
  const removeFromWishlist = async (wishlistId) => {
    try {
      await fetch(`http://localhost:5000/wishlist/${wishlistId}`, {
        method: "DELETE",
      });

      fetchWishlist();

    } catch (err) {
      console.log(err);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);