import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  social_icon_position: "Top" | "Bottom";
};

const initialState: InitialState = {
  social_icon_position: "Top",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSocialIconPosition: (state, action) => {
      state.social_icon_position = action.payload;
    },
  },
});

export const { setSocialIconPosition } = settingSlice.actions;

export default settingSlice.reducer;
