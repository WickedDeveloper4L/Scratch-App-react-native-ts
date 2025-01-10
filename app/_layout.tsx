import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  webClientId:
    "1011263120107-fmplbi7o7l6q2efehlgtairm2metstcr.apps.googleusercontent.com",
});

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <Slot />
        <StatusBar style="light" />
      </Provider>
    </>
  );
}
