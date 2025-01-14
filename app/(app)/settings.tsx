import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/user/user.hooks";
import {
  selectAuthEror,
  selectAuthSession,
  selectCurrentUser,
} from "@/redux/user/user.reducer";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => selectAuthEror(state));
  const user = useAppSelector((state) => selectCurrentUser(state));
  console.log(user);
  const handleSignOut = () => {
    dispatch(signOut());

    if (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>{user?.name}</Text>
      <Text style={styles.profileText}>{user?.email}</Text>
      <Text style={styles.profileText}>{user?.country}</Text>
      <Text style={styles.profileText}>{user?.gender}</Text>
      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#e4e4" : "#ae0563",
          },
          styles.btnCon,
        ]}
      >
        <Text style={styles.btnText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCon: {
    padding: 15,
    width: "50%",
    borderRadius: 7,
    marginTop: 30,
    alignItems: "center",
  },
  profileText: {
    color: "#fff",
    fontSize: 12,
    margin: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
