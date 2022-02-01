import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import authReducer from "./auth-slice";
import itemsReducer from "./items-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    items: itemsReducer,
  },
});

export default store;
