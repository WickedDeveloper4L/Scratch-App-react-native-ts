import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
});
