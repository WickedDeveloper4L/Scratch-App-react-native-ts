import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </Provider>
    </>
  );
}
