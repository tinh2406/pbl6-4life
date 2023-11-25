import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LocationService } from "./ModalLocation";
const config = { duration: 200, easing: Easing.bezier(0.5, 0.01, 0, 1) };
export default ({ expand, onClose, onConfirm }) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const heightContainer = useSharedValue(50);
  const widthContainer = useSharedValue(width);
  const bottomICSearch = useSharedValue(0);
  const leftICSearch = useSharedValue(0);
  const posICSearch = useSharedValue("relative");
  const marginText = useSharedValue(0);
  const fontSizeText = useSharedValue(14);
  const opacity = useSharedValue(0);
  useEffect(() => {
    if (expand) {
      heightContainer.value = height - 100;
      widthContainer.value = width - 20;
      posICSearch.value = "absolute";
      bottomICSearch.value = -50;
      leftICSearch.value = 20;
      marginText.value = 30;
      fontSizeText.value = 20;
      opacity.value = 1;
    } else {
      heightContainer.value = 50;
      widthContainer.value = width;
      posICSearch.value = "absolute";
      bottomICSearch.value = 0;
      leftICSearch.value = 0;
      marginText.value = 0;
      fontSizeText.value = 14;
      opacity.value = 0;
    }
  }, [expand]);
  const containerStyle = useAnimatedStyle(() => ({
    height: withTiming(heightContainer.value, config),
    width: withTiming(widthContainer.value, config),
  }));
  const iconStyle = useAnimatedStyle(() => ({
    position: withTiming(posICSearch.value, config),
    bottom: withTiming(bottomICSearch.value, config),
    left: withTiming(leftICSearch.value, config),
  }));
  const textStyle = useAnimatedStyle(() => ({
    marginLeft: withTiming(marginText.value, config),
    fontSize: withTiming(fontSizeText.value, config),
  }));
  const hiddenStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, config),
  }));

  const [timeoutId, setTimeOutId] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [selected, setSelected] = useState();
  const [params, setParams] = useState({
    Keyword: "",
    PageSize: 10,
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#ffffff",
        },
        containerStyle,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name="search"
            size={18}
            color="black"
            style={{
              padding: 5,
            }}
          />
        </Animated.View>
        <Animated.Text
          style={[
            {
              fontWeight: "500",
            },
            textStyle,
          ]}
        >
          {selected ? `${selected?.district}, ${selected?.city}` : "Where to?"}
        </Animated.Text>
      </View>
      <Animated.View
        style={[
          {
            alignItems: "center",
            width: "100%",
            flex: 1,
          },
          hiddenStyle,
        ]}
      >
        <View
          style={{
            width: "90%",
            marginHorizontal: 30,
          }}
        >
          <TextInput
            placeholder="Search destinations"
            value={textSearch}
            onChangeText={(text) => {
              setTextSearch(text);
              if (timeoutId) clearTimeout(timeoutId);
              setTimeOutId(
                setTimeout(() => {
                  setParams({ ...params, Keyword: text });
                }, 300)
              );
            }}
            placeholderTextColor="#424242"
            style={{
              paddingHorizontal: 50,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: 10,
              fontSize: 14,
            }}
          />
          {textSearch === "" || (
            <Ionicons
              name="close"
              size={14}
              color="black"
              style={{
                padding: 3,
                backgroundColor: "#c7d2d4",
                position: "absolute",
                borderRadius: 10,
                right: 12,
                top: 14,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setTextSearch("");
                setParams({ ...params, Keyword: "" });
              }}
            />
          )}
          <LocationService select={setSelected} params={params} />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Pressable
            onPress={() => {
              onClose();
              setSelected();
              onConfirm({});
            }}
          >
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (selected) onConfirm({ LocationId: selected?.id });
              onClose();
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: "white",
                backgroundColor: "#ff385c",
                padding: 8,
                paddingHorizontal: 12,
                borderRadius: 5,
              }}
            >
              Search
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
