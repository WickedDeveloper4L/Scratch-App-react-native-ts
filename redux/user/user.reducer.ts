import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { signInWithEmailAndPasssword, signup } from "./user.hooks";

interface AuthProps {
  currentUser: User | null;
  isAuthLoading: boolean;
  authError: AuthError | null;
}

const initialState: AuthProps = {
  currentUser: null,
  isAuthLoading: true,
  authError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      signup.fulfilled,
      (
        state,
        action: PayloadAction<
          | { user: User | null; session: Session | null }
          | { user: null; session: null }
        >
      ) => {
        if (action.payload.user) {
          state.currentUser = action.payload.user;
          state.isAuthLoading = false;
        } else {
          state.currentUser = null;
        }
        state.isAuthLoading = false;
      }
    );
    builder.addCase(signup.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      if (action.payload) {
        state.authError = action.payload as AuthError;
        state.isAuthLoading = false;
      } else {
        state.authError = null;
      }

      state.isAuthLoading = false;
    });
    builder.addCase(signInWithEmailAndPasssword.fulfilled, (state, action) => {
      if (action.payload.user) {
        state.currentUser = action.payload.user;
        state.isAuthLoading = false;
      } else {
        state.currentUser = null;
      }
      state.isAuthLoading = false;
    });
    builder.addCase(signInWithEmailAndPasssword.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signInWithEmailAndPasssword.rejected, (state, action) => {
      if (action.payload) {
        state.authError = action.payload as AuthError;
        state.isAuthLoading = false;
      } else {
        state.authError = null;
      }
      state.isAuthLoading = false;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthEror = (state: RootState) => state.auth.authError;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.isAuthLoading;
export default authSlice.reducer;
