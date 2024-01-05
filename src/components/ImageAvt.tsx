// import { Image, ImageStyle } from "expo-image";
import { Image, ImageStyle, Pressable } from "react-native";
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
    <Pressable onPress={onPress}>
      <Image
        // onTouchEnd={() => {
        //   if (onPress) onPress();
        // }}
        // placeholder={defaultAvt}
        source={src ? { uri: src } : defaultAvt}
        style={[{}, style]}
        // cachePolicy="memory"
        // transition={transition || 1}
      />
    </Pressable>
  );
};
