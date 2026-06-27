import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function OrdersPage() {
  const { user } = useAuth();

  
  const orders = JSON.parse(localStorage.getItem("orders_" + user?.email)) || [];

  if (!user) {
    return <h2 className="text-center mt-5">Please login to view your orders.</h2>;
  }

  if (orders.length === 0) {
    return <h2 className="text-center mt-5">No orders found.</h2>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Orders</h2>

      {orders.map((order, index) => (
        <div key={index} className="p-3 mb-3 border rounded">
          <h5>Order #{index + 1}</h5>
          <p>Date: {order.date}</p>

          {order.items.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-2">
              <img
                src={item.img}
                alt={item.name}
                width="60"
                height="60"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <div className="ms-3">
                <strong>{item.name}</strong>
                <p className="m-0">Qty: {item.quantity}</p>
                <p className="m-0">Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
