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
    color: "bg-[#000957]",
    text: "text-white",
    name: "Blue Horizon",
    linkStyle: "rounded-md",
    shopBox: "rounded-md",
    boxColor: "bg-[#344CB7]",
    hover: "",
    embosedBox: true,
    embosedBoxColor: "bg-[#FFEB00]",
    tabColor: "bg-blue-600",
    selectedShareLinkBackgroundIndex: 0,
    shareLink_background: [
      { background: "bg-[#000957]", textColor: "text-white" }, // Deep blue - white text for contrast
      { background: "bg-[#344CB7]", textColor: "text-white" }, // Light blue - white text for readability
      { background: "bg-[#FFEB00]", textColor: "text-black" }, // Yellow - black text for readability
      { background: "bg-blue-500", textColor: "text-white" }, // Medium blue - white text for contrast
      { background: "bg-[#87CEEB]", textColor: "text-black" }, // Sky blue - black text for better readability
    ],
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
    setSelectedShareLinkBackgroundIndex: (state, action) => {
      state.theme.selectedShareLinkBackgroundIndex = action.payload;
    },
  },
});

export const { setProfile, setSelectedShareLinkBackgroundIndex } =
  profileSlice.actions;
export default profileSlice.reducer;
