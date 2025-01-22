import { SocialIcon } from "@/types/SocialIcon";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  socialIcons: SocialIcon[];
};

const initialState: InitialState = {
  socialIcons: [],
};

export const socialIconSlice = createSlice({
  name: "socialIcon",
  initialState,
  reducers: {
    setSocialIcons: (state, action) => {
      state.socialIcons = action.payload;
    },
  },
});

export const { setSocialIcons } = socialIconSlice.actions;

export default socialIconSlice.reducer;
