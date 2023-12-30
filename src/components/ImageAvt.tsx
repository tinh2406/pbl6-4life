import { Image, ImageStyle } from "expo-image";
import { StyleProp } from "react-native";
const defaultAvt = require("../assets/defaultAvatar.png");

export default ({
  src,
  style,
  transition,
  onPress,
}: {
  src: string;
  style: StyleProp<ImageStyle>;
  transition?: number;
  onPress?: () => void;
}) => {
  return (
    <Image
      onTouchEnd={() => {
        if (onPress) onPress();
      }}
      placeholder={defaultAvt}
      source={src || defaultAvt}
      style={[{}, style]}
      cachePolicy="memory"
      transition={transition || 1}
    />
  );
};
