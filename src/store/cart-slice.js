import { createSlice } from "@reduxjs/toolkit";

const initialCartItems = JSON.parse(localStorage.getItem("items"));
const initialState = {
  isVisible: true,
  totalItems: +localStorage.getItem("totalItems"),
  totalPrice: +localStorage.getItem("totalPrice"),
  items: initialCartItems || [],
  // {
  //   id: "",
  //   name: "",
  //   price: 0,
  //   amount: 0,
  // },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const repeatIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (repeatIndex === -1) {
        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + action.payload.price;
        state.items = [...state.items, action.payload];
      } else {
        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + action.payload.price;
        state.items[repeatIndex].amount =
          state.items[repeatIndex].amount + action.payload.amount;
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.removeAll) {
        state.totalItems = state.totalItems - state.items[itemIndex].amount;
        state.totalPrice =
          state.totalPrice -
          state.items[itemIndex].amount * state.items[itemIndex].price;
        state.items.splice(itemIndex, 1);
      } else {
        if (state.items[itemIndex].amount === 1) {
          state.totalItems--;
          state.totalPrice = state.totalPrice - state.items[itemIndex].price;
          state.items[itemIndex].amount = state.items[itemIndex].amount - 1;
          state.items.splice(itemIndex, 1);
        } else {
          state.totalItems--;
          state.totalPrice = state.totalPrice - state.items[itemIndex].price;
          state.items[itemIndex].amount = state.items[itemIndex].amount - 1;
        }
      }
    },
    clearCart: () => {
      console.log(`clearing`);
    },
    toggleCart: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, toggleCart } =
  cartSlice.actions;

export default cartSlice.reducer;
