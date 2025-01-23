import { SocialIcon } from "@/types/SocialIcon";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  socialIcons: SocialIcon[];
  clickedAddIconButton: boolean;
  clickedSocialMediaId: number;
  iconsSlectionViewOnDisplay: boolean;
  editSocialIconId: number;
  socialIconPosition: "Top" | "Bottom";
};

const initialState: InitialState = {
  socialIcons: [],
  clickedAddIconButton: false,
  clickedSocialMediaId: 0,
  iconsSlectionViewOnDisplay: false,
  editSocialIconId: 0,
  socialIconPosition: "Top",
};

export const socialIconSlice = createSlice({
  name: "socialIcon",
  initialState,
  reducers: {
    setSocialIcons: (state, action) => {
      state.socialIcons = action.payload;
    },
    setClickedAddIconButton: (state, action) => {
      state.clickedAddIconButton = action.payload;
    },
    setClickedSocialMediaId: (state, action) => {
      state.clickedSocialMediaId = action.payload;
    },
    setIconsSelectionViewOnDisplay: (state, action) => {
      state.iconsSlectionViewOnDisplay = action.payload;
    },
    setEditSocialIconId: (state, action) => {
      state.editSocialIconId = action.payload;
    },
    setSocialIconPosition: (state, action) => {
      state.socialIconPosition = action.payload;
    },
  },
});

export const {
  setSocialIcons,
  setClickedAddIconButton,
  setClickedSocialMediaId,
  setIconsSelectionViewOnDisplay,
  setEditSocialIconId,
  setSocialIconPosition,
} = socialIconSlice.actions;

export default socialIconSlice.reducer;
