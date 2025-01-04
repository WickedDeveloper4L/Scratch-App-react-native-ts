import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signInWithEmailAndPasssword } from "@/redux/user/user.hooks";
import {
  selectAuthEror,
  selectCurrentUser,
  setUser,
} from "@/redux/user/user.reducer";
import { Image } from "expo-image";
import { Link, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
const logo = require("@/assets/images/icon.png");
interface InfoProps {
  email: string;
  password: string;
}
export default function Signin() {
  const [info, setInfo] = useState<InfoProps>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => selectCurrentUser(state));
  const authError = useAppSelector((state) => selectAuthEror(state));
  if (authError?.code === "user_already_exists") {
    dispatch(setUser());
  }
  console.log(authError?.message);
  useEffect(() => {
    user && <Redirect href="/(app)" />;
  }, [user]);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Scratch</Text>
      <Text style={styles.small}>continue your memories...</Text>
      <TextInput
        placeholder="email"
        value={info.email}
        style={styles.input}
        placeholderTextColor="#25292e"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={(text) => setInfo({ ...info, email: text })}
      />

      <TextInput
        placeholder="password"
        value={info.password}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#25292e"
        textContentType="password"
        onChangeText={(text) => setInfo({ ...info, password: text })}
      />
      <View style={styles.btnCon}>
        <Pressable onPress={() => dispatch(signInWithEmailAndPasssword(info))}>
          <Text style={styles.btnText}>Sign In</Text>
        </Pressable>
      </View>
      <Link href="/signup" style={styles.label}>
        create an account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ae0563",
    marginTop: 20,
  },
  small: {
    fontSize: 17,
    margin: 10,
    color: "#fff",
    fontStyle: "italic",
  },
  label: {
    fontSize: 16,
    color: "#fff",
    margin: 10,
  },
  input: {
    backgroundColor: "#fff",
    color: "#25292e",
    fontSize: 15,
    padding: 10,
    borderRadius: 7,
    width: "70%",
    height: 40,
    margin: 15,
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
