import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const exist = state.find((x) => x.id === product.id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.push({ ...product, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeOne(state, action) {
      const product = action.payload;
      const exist = state.find((x) => x.id === product.id);

      if (exist.qty === 1) {
        const newState = state.filter((x) => x.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      } else {
        exist.qty--;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    delCart(state, action) {
      const product = action.payload;
      const newState = state.filter((x) => x.id !== product.id);
      
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    
    clearCart(state) {
      localStorage.removeItem("cart");
      return [];
    }
  },
});

export const { addCart, delCart, removeOne, clearCart } = cartSlice.actions;
export default cartSlice.reducer;