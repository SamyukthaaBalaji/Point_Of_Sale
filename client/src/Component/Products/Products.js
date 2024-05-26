import React, { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../ProductContext";
import { useAuth } from "../../AuthContext";
import "./products.css";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { addToCart } = useAuth();
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/product/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setQuantities(Array(data.length).fill(0));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
    }
    setQuantities(newQuantities);
  };

  const handleAddToCart = () => {
    products.forEach((product, index) => {
      if (quantities[index] > 0) {
        addToCart(product, quantities[index]);
        toast.success(`${product.name} added to cart!`);
      }
    });
    setQuantities(Array(products.length).fill(0)); // Reset quantities after adding to cart
  };

  const incrementedProducts = products.filter(
    (_, index) => quantities[index] > 0
  );

  return (
    <div className="d-flex">
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-4" key={product.id}>
              <div className="card mb-4">
                {product.image && (
                  <img
                    src={`http://localhost:9000${product.image}`}
                    alt={product.name}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Description: {product.description}
                  </p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Quantity: {quantities[index]}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDecrement(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleIncrement(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-sidebar">
        <h4>Cart</h4>
        {incrementedProducts.length > 0 ? (
          incrementedProducts.map((product, index) => (
            <div key={product.id} className="cart-item">
              <span>{product.name}</span>
              <span>Quantity: {quantities[products.indexOf(product)]}</span>
            </div>
          ))
        ) : (
          <p>No items added</p>
        )}
        <button className="btn btn-secondary mt-3" onClick={handleAddToCart}>
          <FaShoppingCart /> Add All to Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
