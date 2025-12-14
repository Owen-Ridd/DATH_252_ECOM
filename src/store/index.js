import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../modules/orders/store/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export default store;