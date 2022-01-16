import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: true,
  totalItems: 0,
  totalPrice: 0,
  items: [
    // {
    //   id: "",
    //   name: "",
    //   price: 0,
    //   amount: 0,
    // },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const repeatIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(`index`, repeatIndex);
      if (repeatIndex === -1) {
        console.log("adddddddddd");
        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + action.payload.price;
        state.items = [...state.items, action.payload];
      } else {
        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + action.payload.price;
        state.items[repeatIndex].amount =
          state.items[repeatIndex].amount + action.payload.amount;
        state.items[repeatIndex].price =
          state.items[repeatIndex].price + action.payload.price;
      }
    },
    removeItemFromCart: () => {
      console.log(`removing`);
    },
    clearCart: () => {
      console.log(`clearing`);
    },
    toggleCart: (state, action) => {
      console.log(`tglle`);
      state.isVisible = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, toggleCart } =
  cartSlice.actions;

export default cartSlice.reducer;
