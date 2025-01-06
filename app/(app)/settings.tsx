import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "@/redux/user/user.hooks";
import { selectAuthEror, selectAuthSession } from "@/redux/user/user.reducer";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => selectAuthEror(state));

  const handleSignOut = () => {
    dispatch(signOut());

    if (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnCon}>
        <Pressable onPress={handleSignOut}>
          <Text style={styles.btnText}>Sign Out</Text>
        </Pressable>
      </View>
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
    backgroundColor: "#ae0563",
    padding: 15,
    width: "50%",
    borderRadius: 7,
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
});
