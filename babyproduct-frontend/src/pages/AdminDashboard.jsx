import React, { useEffect, useState } from "react";
import AddProduct from "../components/Admin/AddProduct";
import ProductsTable from "../components/Admin/ProductsTable";
import UsersTable from "../components/Admin/UsersTable";

export default function AdminDashboard() {
  const [section, setSection] = useState("users");

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4" style={{ color: "#f27777" }}>
        Admin Dashboard
      </h2>

     
      <div className="d-flex gap-3 mb-4">
        <button
          className={`btn ${section === "users" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => setSection("users")}
        >
          Manage Users
        </button>

        <button
          className={`btn ${section === "products" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => setSection("products")}
        >
          Products List
        </button>

        <button
          className={`btn ${section === "add" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => setSection("add")}
        >
          Add New Product
        </button>
      </div>

      
      {section === "users" && <UsersTable />}
      {section === "products" && <ProductsTable />}
      {section === "add" && <AddProduct />}
    </div>
  );
}
