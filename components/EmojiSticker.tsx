import { Image, type ImageSource } from "expo-image";
import { View } from "react-native";

interface Props {
  imageSize: number;
  stickerSource: ImageSource;
}
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
