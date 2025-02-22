"use client";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { linkSlice } from "./link/linkSlice";
import { shopSlice } from "./shop/shopSlice";
import { profileSlice } from "./profile/profileSlice";
import { socialIconSlice } from "./socialIcon/socialIconSlice";
import { settingSlice } from "./setting/settingSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [linkSlice.name]: linkSlice.reducer,
    [shopSlice.name]: shopSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
    [socialIconSlice.name]: socialIconSlice.reducer,
    [settingSlice.name]: settingSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
