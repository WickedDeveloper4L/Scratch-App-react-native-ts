import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthError, AuthSession, Session, User } from "@supabase/supabase-js";
import { signInWithEmailAndPasssword, signup } from "./user.hooks";

interface AuthProps {
  currentUser: User | null;
  isAuthLoading: boolean;
  authError: AuthError | null;
  authSession: AuthSession | null;
}

const initialState: AuthProps = {
  currentUser: null,
  isAuthLoading: false,
  authError: null,
  authSession: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state) => {
      state.currentUser = null;
    },
    setSession: (state, action: PayloadAction<AuthSession>) => {
      state.authSession = action.payload;
    },
  },
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
        if (action.payload) {
          state.currentUser = action.payload.user;
          state.authSession = action.payload.session;
          state.isAuthLoading = false;
        } else {
          state.currentUser = null;
          state.authSession = null;
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
export const selectAuthSession = (state: RootState) => state.auth.authSession;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.isAuthLoading;
export const { setUser, setSession } = authSlice.actions;
export default authSlice.reducer;
