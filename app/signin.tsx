import { Image } from "expo-image";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
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
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Scratch</Text>
      <TextInput
        placeholder="email"
        value={info.email}
        style={styles.input}
        placeholderTextColor="#25292e"
      />
      <TextInput
        placeholder="password"
        value={info.password}
        style={styles.input}
        placeholderTextColor="#25292e"
      />
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
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
});
