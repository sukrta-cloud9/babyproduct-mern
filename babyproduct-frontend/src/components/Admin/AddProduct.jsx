import React, { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    description: "",
    active: true,
  });

  
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", product.image);

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product Added Successfully!");

      setProduct({
        name: "",
        category: "",
        price: "",
        image: null,
        description: "",
        active: true,
      });

      
      document.getElementById("imageInput").value = "";

    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-3">Add New Product</h4>

      <form onSubmit={handleAdd}>
        <input
          className="form-control mb-3"
          placeholder="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          id="imageInput"
          className="form-control mb-3"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setProduct({
              ...product,
              image: e.target.files[0],
            })
          }
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-danger w-100">
          Add Product
        </button>
      </form>
    </div>
  );
}