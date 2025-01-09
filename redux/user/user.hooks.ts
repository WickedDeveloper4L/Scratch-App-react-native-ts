import { supabase } from "@/utils/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk(
  "auth/signup",
  async (authData: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
    });
    return data;
  }
);

export const signInWithEmailAndPasssword = createAsyncThunk(
  "auth/signInWithEmailAndPasssword",
  async (userData: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    return data;
  }
);

export const signOut = createAsyncThunk("auth/signout", async () => {
  const { error } = await supabase.auth.signOut();
  return error;
});
