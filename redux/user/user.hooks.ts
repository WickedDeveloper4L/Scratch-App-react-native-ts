import { supabase } from "@/utils/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./user.reducer";
import { AuthError } from "@supabase/supabase-js";

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    authData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
      options: {
        data: {
          email: authData.email,
        },
      },
    });

    if (error) {
      return rejectWithValue(error);
    }
    return data;
  }
);

export const signInWithEmailAndPasssword = createAsyncThunk(
  "auth/signInWithEmailAndPasssword",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });
    if (error) {
      return rejectWithValue(error);
    }
    return data;
  }
);

export const signOut = createAsyncThunk("auth/signout", async () => {
  const { error } = await supabase.auth.signOut();
  return error;
});
