import React, { useEffect, useState } from "react";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const toggleActive = async (id, currentStatus) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !currentStatus }),
    });

    setProducts(products.map(p => (p.id === id ? { ...p, active: !currentStatus } : p)));
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h4 className="mb-3">All Products</h4>

      <table className="table table-bordered">
        <thead className="table-danger">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Activate / Deactivate</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.active ? "Active" : "Inactive"}</td>

              <td>
                <button
                  className={`btn ${p.active ? "btn-warning" : "btn-success"}`}
                  onClick={() => toggleActive(p.id, p.active)}
                >
                  {p.active ? "Deactivate" : "Activate"}
                </button>
              </td>

              <td>
                <button className="btn btn-danger" onClick={() => deleteProduct(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
