import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, name, price, image, quantity }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += newItem.price;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.price * existingItem.quantity;

      state.items = state.items.filter(item => item.id !== id);
    },

    increaseQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return;

      item.quantity += 1;
      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return;

      item.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalAmount -= item.price;

      if (item.quantity === 0) {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
