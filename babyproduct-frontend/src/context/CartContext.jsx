import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState({
    items: [],
  });

  
  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${user._id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await res.json();

      const items = data
  .filter((item) => item.product)
  .map((item) => ({
    productId: item.product._id,
    cartId: item._id,
    name: item.product.name,
    price: item.product.price,
    img: item.product.image,
    qty: item.quantity,
  }));

      setCart({ items });
    } catch (err) {
      console.error("Fetch Cart Error:", err);
      setCart({ items: [] });
    }
  };

  useEffect(() => {
  if (user) {
    fetchCart();
  } else {
    setCart({ items: [] });
  }
}, [user]);

  
  const addToCart = async (product) => {
    if (!user) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      await fetchCart();
    } catch (err) {
      console.error("Add Cart Error:", err);
    }
  };

  
  const removeFromCart = async (cartId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await fetchCart();
    } catch (err) {
      console.error("Remove Cart Error:", err);
    }
  };

  
  const updateQty = async (cartId, qty) => {
    if (qty < 1) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${cartId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: qty,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      await fetchCart();
    } catch (err) {
      console.error("Update Qty Error:", err);
    }
  };

  
  const clearCart = () => {
    setCart({
      items: [],
    });
  };

  
  const getTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + Number(item.price) * item.qty;
    }, 0);
  };

  
  const getCartCount = () => {
    return cart.items.reduce((sum, item) => sum + item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        getTotal,
        getCartCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);