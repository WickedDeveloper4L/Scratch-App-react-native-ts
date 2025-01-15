import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectAuthSession,
  setSession,
  setUserInfo,
} from "@/redux/user/user.reducer";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function TabLayout() {
  const session = useAppSelector((state) => selectAuthSession(state));
  const dispatch = useAppDispatch();
  const getUser = async () => {
    if (session) {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session?.user?.id)
        .single();
      console.log("fired");

      if (!error) dispatch(setUserInfo(data));
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) dispatch(setSession(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) dispatch(setSession(session));
    });
    getUser();
  }, []);
  if (!session) {
    return <Redirect href="/signin" />;
  }
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
