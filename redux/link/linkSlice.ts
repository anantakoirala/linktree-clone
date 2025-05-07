import { Link } from "@/types/Link";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  links: Link[];
  idForNameEdit: string;
  idForUrlEdit: string;
  socialIconsModalOpen: boolean;
};

const initialState: initialState = {
  links: [],
  idForNameEdit: "",
  idForUrlEdit: "",
  socialIconsModalOpen: false,
};

export const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setIdForNameEdit: (state, action) => {
      state.idForNameEdit = action.payload;
      state.idForUrlEdit = "";
    },
    setIdForUrlEdit: (state, action) => {
      state.idForUrlEdit = action.payload;
      state.idForNameEdit = "";
    },
    openSocialIconsModal: (state) => {
      state.socialIconsModalOpen = true;
    },
    closeSocialIconsModal: (state) => {
      state.socialIconsModalOpen = false;
    },
  },
});

export const {
  setLinks,
  setIdForNameEdit,
  setIdForUrlEdit,
  openSocialIconsModal,
  closeSocialIconsModal,
} = linkSlice.actions;
export default linkSlice.reducer;
