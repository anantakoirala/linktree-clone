import { Link } from "@/types/Link";
import { Theme } from "@/types/Theme";
import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  _id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  theme: Theme;
  profile_title: string;
  bio: string;
};

const initialState: initialState = {
  _id: "",
  name: "",
  username: "",
  image: "",
  email: "",
  profile_title: "",
  bio: "",
  theme: {
    id: 2,
    color: "bg-[#000957]", // Deep Blue
    text: "text-white", // White text for contrast
    shopBox: "rounded-md",
    name: "Blue Horizon",
    linkStyle: "rounded-md", // Rounded link style
    boxColor: "bg-[#344CB7]", // Lighter Blue
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#FFEB00]", // Yellow for embossed effect
  },
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
      state.profile_title = action.payload.profile_title;
      state.bio = action.payload.bio;
      state.theme = action.payload.theme;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
