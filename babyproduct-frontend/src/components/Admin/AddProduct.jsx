import React, { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    active: true,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    alert("Product Added Successfully!");
    setProduct({ name: "", category: "", price: "", image: "", description: "", active: true });
  };

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">Add New Product</h4>

      <form onSubmit={handleAdd}>
        <input className="form-control mb-3" placeholder="Product Name" name="name" value={product.name} onChange={handleChange} />

        <input className="form-control mb-3" placeholder="Category" name="category" value={product.category} onChange={handleChange} />

        <input className="form-control mb-3" placeholder="Price" name="price" value={product.price} onChange={handleChange} />

        <input className="form-control mb-3" placeholder="Image URL" name="image" value={product.image} onChange={handleChange} />

        <textarea className="form-control mb-3" placeholder="Description" name="description" value={product.description} onChange={handleChange}></textarea>

        <button className="btn btn-danger w-100">Add Product</button>
      </form>
    </div>
  );
}
