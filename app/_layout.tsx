import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
