import { Product } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  products: Product[];
};

const initialState: initialState = {
  products: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setAllProducts } = shopSlice.actions;

export default shopSlice.reducer;
