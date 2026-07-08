
import React, {createContext,useContext,useState, useEffect,} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
  });
  const { user } = useAuth();
  const fetchCart = async () => {
  if (!user) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/cart/${user._id}`
    );

    const data = await res.json();

    const items = data.map((item) => ({
      productId: item.product._id,
      cartId: item._id,
      name: item.product.name,
      price: item.product.price,
      img: item.product.image,
      qty: item.quantity,
    }));

    setCart({
      items,
    });

  } catch (err) {
    console.log(err);
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
    await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        productId: product.id,
      }),
    });

    
    await fetchCart();

    

  } catch (err) {
    console.log(err);
  }
};

      
  
  const removeFromCart = async (cartId) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/cart/${cartId}`, {
      method: "DELETE",
    });

    fetchCart();
  } catch (err) {
    console.log(err);
  }
};

  
  const updateQty = async (cartId, qty) => {
  if (qty < 1) return;

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/cart/${cartId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: qty,
      }),
    });

    fetchCart();
  } catch (err) {
    console.log(err);
  }
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
