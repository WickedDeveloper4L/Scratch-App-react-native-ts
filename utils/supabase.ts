import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";

export const supabase = createClient(
  // process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  // process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",

  "https://tzscjznouxlkcobmjrmv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6c2Nqem5vdXhsa2NvYm1qcm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NjI1ODUsImV4cCI6MjA1MTMzODU4NX0.t1so_ZDWuXLIuVj3wjHSaDupVEBt5lUMoNmeNVNqqYs",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
