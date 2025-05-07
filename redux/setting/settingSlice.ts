import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  social_icon_position: "Top" | "Bottom";
  shopStatus: boolean;
};

const initialState: InitialState = {
  social_icon_position: "Top",
  shopStatus: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setIconPosition: (state, action) => {
      state.social_icon_position = action.payload;
    },
    setShopStatus: (state, action) => {
      state.shopStatus = action.payload;
    },
  },
});

export const { setIconPosition, setShopStatus } = settingSlice.actions;

export default settingSlice.reducer;
