import { Product } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  products: Product[];
  shop_edit_id: string;
};

const initialState: initialState = {
  products: [],
  shop_edit_id: "",
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
    setShopEditId: (state, action) => {
      state.shop_edit_id = action.payload;
    },
  },
});

export const { setAllProducts, setShopEditId } = shopSlice.actions;

export default shopSlice.reducer;
