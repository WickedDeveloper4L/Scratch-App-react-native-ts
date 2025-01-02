import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallery/gallerySlice";
import authReducer from "./user/user.reducer";
export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
