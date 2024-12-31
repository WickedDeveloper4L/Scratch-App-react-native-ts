import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GalleryProps {
  images: string[];
}

const initialState: GalleryProps = {
  images: [],
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload);
    },
  },
});

export const { addImage } = gallerySlice.actions;

export const selectImages = (state: RootState) => state.gallery.images;

export default gallerySlice.reducer;
