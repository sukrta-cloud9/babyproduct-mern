import React, { createContext, useContext, useState } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
  });

  
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.items.find((item) => item.productId === product.id);

      if (exists) {
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.productId === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...prev,
        items: [
          ...prev.items,
          {
            productId: product.id,
            name: product.name,
            price: Number(String(product.price).replace(/₹/g, "")),
            img: product.img,
            qty: 1,
          },
        ],
      };
    });
  };

  
  const removeFromCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  
  const updateQty = (productId, qty) => {
    if (qty < 1) return;

    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId ? { ...item, qty } : item
      ),
    }));
  };

  
  const clearCart = () => {
    setCart({ items: [] });
  };

  
  const getTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = Number(item.price);
      return total + price * item.qty;
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
    }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
