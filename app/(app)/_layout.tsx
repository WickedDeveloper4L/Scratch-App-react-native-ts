import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectAuthSession,
  selectCurrentUser,
  setSession,
} from "@/redux/user/user.reducer";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function TabLayout() {
  const session = useAppSelector((state) => selectAuthSession(state));

  if (!session) {
    return <Redirect href="/signin" />;
  }

  const dispatch = useAppDispatch();

  console.log(session);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) dispatch(setSession(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) dispatch(setSession(session));
    });
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Gallery",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "images-sharp" : "images-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}