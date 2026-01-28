import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./CartSlice";
import { Link } from "react-router-dom";
import "./CartItem.css";

const CartItem = () => {
  const { items, totalAmount, totalQuantity } = useSelector(
    state => state.cart
  );

  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🌱</h2>
        <Link to="/plants">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />

          <div className="item-details">
            <h3>{item.name}</h3>
            <p>Unit Price: ${item.price}</p>
            <p>Total: ${item.price * item.quantity}</p>
          </div>

          <div className="quantity-controls">
            <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          </div>

          <button
            className="delete-btn"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            ❌
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Total Items: {totalQuantity}</h2>
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      </div>

      <div className="cart-actions">
        <button
          className="checkout-btn"
          onClick={() => alert("Checkout coming soon!")}
        >
          Checkout
        </button>

        <Link to="/plants" className="continue-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartItem;
