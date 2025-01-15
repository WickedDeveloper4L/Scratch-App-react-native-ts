import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { AuthError, AuthSession, Session, User } from "@supabase/supabase-js";
import { signInWithEmailAndPasssword, signOut, signup } from "./user.hooks";

interface AuthProps {
  currentUser: User | any;
  isAuthLoading: boolean;
  authError: AuthError | null | any;
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
    setUserInfo: (state, action) => {
      state.currentUser = action.payload;
    },
    setSession: (state, action: PayloadAction<AuthSession>) => {
      state.authSession = action.payload;
      state.isAuthLoading = false;
    },
    setError: (state, action: PayloadAction<AuthError>) => {
      state.authError = action.payload;
      state.isAuthLoading = false;
      state.authSession = null;
      state.currentUser = null;
    },
    clearError: (state) => {
      state.authError = null;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
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
        state.currentUser = action.payload.user;
        state.authSession = action.payload.session;
        state.isAuthLoading = false;
      }
    );
    builder.addCase(signup.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.authError = action.payload as AuthError;
      state.isAuthLoading = false;
      state.isAuthLoading = false;
    });
    builder.addCase(signInWithEmailAndPasssword.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthLoading = false;
      state.authSession = action.payload.session;
    });
    builder.addCase(signInWithEmailAndPasssword.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(signInWithEmailAndPasssword.rejected, (state, action) => {
      state.isAuthLoading = false;
      state.authError = action.payload as AuthError;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      if (!action.payload) {
        state.currentUser = null;
        state.authSession = null;
      }
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.authError = action.payload as AuthError;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthEror = (state: RootState) => state.auth.authError;
export const selectAuthSession = (state: RootState) => state.auth.authSession;
export const selectIsAuthLoading = (state: RootState) =>
  state.auth.isAuthLoading;
export const {
  setUser,
  setSession,
  setError,
  setIsLoading,
  setUserInfo,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
