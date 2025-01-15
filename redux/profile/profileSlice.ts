import { Link } from "@/types/Link";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  _id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  theme: string;
};

const initialState: initialState = {
  _id: "",
  name: "",
  username: "",
  image: "",
  email: "",
  theme: JSON.stringify({
    id: 2,
    color: "bg-[#000957]", // Deep Blue
    text: "text-white", // White text for contrast
    name: "Blue Horizon",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#344CB7]", // Lighter Blue
    embosedBox: true,
    embosedBoxColor: "bg-[#FFEB00]", // Yellow for embossed effect
  }),
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.theme = action.payload.theme;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
