import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart:(state,action) =>{
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    },
  },
);

export const { addToCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
