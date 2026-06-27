import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Infants", "Toddlers", "Kids", "Maternity"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading products...</h3>
      </div>
    );
  }

  return (
    <div className="products-page container py-5">
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (item) => item.category === category
        );
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category} className="category-section mb-5">
            <h2 className="category-title text-center mb-4 pastel-heading">
              {category}
            </h2>
            <div className="row">
              {categoryProducts.map((product) => (
                <div key={product._id} className="col-md-3 mb-4">
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    price={`₹${product.price}`}
                    img={product.image}       
                    rating={product.rating}
                    offer={product.offer}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;