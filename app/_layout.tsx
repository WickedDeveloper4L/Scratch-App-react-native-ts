import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function RootLayout() {
  GoogleSignin.configure();
  return (
    <>
      <Provider store={store}>
        <Slot />
        <StatusBar style="light" />
      </Provider>
    </>
  );
}
