import { Link } from "@/types/Link";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  links: Link[];
  idForNameEdit: string;
  idForUrlEdit: string;
};

const initialState: initialState = {
  links: [],
  idForNameEdit: "",
  idForUrlEdit: "",
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
  },
});

export const { setLinks, setIdForNameEdit, setIdForUrlEdit } =
  linkSlice.actions;
export default linkSlice.reducer;
