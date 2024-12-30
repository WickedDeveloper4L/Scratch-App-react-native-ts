import { Image, type ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

interface ImageProps {
  imgSource: ImageSource;
}
export default function ImageViewer({ imgSource }: ImageProps) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
