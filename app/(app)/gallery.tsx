import { View, FlatList, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { useAppSelector } from "@/redux/hooks";
import { selectImages } from "@/redux/gallery/gallerySlice";
import { useEffect, useState } from "react";
export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const imagesFromReducer = useAppSelector((state: any) => selectImages(state));
  useEffect(() => {
    setGalleryImages(imagesFromReducer);
  }, [imagesFromReducer]);
  return (
    <View style={styles.container}>
      {galleryImages ? (
        <FlatList
          data={galleryImages}
          renderItem={(image) => {
            return <Image source={image.item} style={styles.image} />;
          }}
        />
      ) : (
        <Text style={styles.text}>No saved scratch.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    marginVertical: 15,
  },
});
