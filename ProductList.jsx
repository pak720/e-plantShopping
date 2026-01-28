import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";
import { Link } from "react-router-dom";
import "./ProductList.css";

const plantsData = [
  {
    category: "Indoor Plants",
    items: [
      { id: 1, name: "Monstera", price: 25, image: "/assets/images/monstera.jpg" },
      { id: 2, name: "Snake Plant", price: 18, image: "/assets/images/snake.jpg" },
      { id: 3, name: "Peace Lily", price: 22, image: "/assets/images/lily.jpg" },
      { id: 4, name: "Pothos", price: 15, image: "/assets/images/pothos.jpg" },
      { id: 5, name: "Rubber Plant", price: 28, image: "/assets/images/rubber.jpg" },
      { id: 6, name: "ZZ Plant", price: 20, image: "/assets/images/zz.jpg" },
    ],
  },
  {
    category: "Succulents",
    items: [
      { id: 7, name: "Aloe Vera", price: 12, image: "/assets/images/aloe.jpg" },
      { id: 8, name: "Jade Plant", price: 14, image: "/assets/images/jade.jpg" },
      { id: 9, name: "Echeveria", price: 10, image: "/assets/images/echeveria.jpg" },
      { id: 10, name: "Haworthia", price: 11, image: "/assets/images/haworthia.jpg" },
      { id: 11, name: "Zebra Plant", price: 13, image: "/assets/images/zebra.jpg" },
      { id: 12, name: "Cactus Mix", price: 16, image: "/assets/images/cactus.jpg" },
    ],
  },
  {
    category: "Outdoor Plants",
    items: [
      { id: 13, name: "Rose Bush", price: 30, image: "/assets/images/rose.jpg" },
      { id: 14, name: "Lavender", price: 20, image: "/assets/images/lavender.jpg" },
      { id: 15, name: "Fern", price: 18, image: "/assets/images/fern.jpg" },
      { id: 16, name: "Palm Plant", price: 35, image: "/assets/images/palm.jpg" },
      { id: 17, name: "Hydrangea", price: 26, image: "/assets/images/hydrangea.jpg" },
      { id: 18, name: "Bamboo", price: 24, image: "/assets/images/bamboo.jpg" },
    ],
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Paradise Nursery</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart ({totalQuantity})
          </Link>
        </div>
      </nav>

      <div className="product-page">
        {plantsData.map(category => (
          <div key={category.category} className="category-section">
            <h2>{category.category}</h2>

            <div className="plant-grid">
              {category.items.map(plant => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price}</p>

                  <button
                    disabled={isInCart(plant.id)}
                    onClick={() => dispatch(addToCart(plant))}
                  >
                    {isInCart(plant.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
