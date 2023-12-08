import { memo, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "react-native";
import { useWindowDimensions } from "react-native";

const ReviewCard = () => {
  const width = useWindowDimensions().width;

  const circleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [timeOutId, setTimeoutId] = useState();
  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start(() => {
      const id = setTimeout(() => {
        circleAnimated();
      }, 700);
      setTimeoutId(id);
    });
  };
  const translateMini = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 80],
  });
  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, (1 / 4) * width],
  });

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, (3 / 4) * width],
  });
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, width],
  });

  useEffect(() => {
    circleAnimated();
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
    };
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height:120,
        backgroundColor: "white",
        margin: 0,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          height:30,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#ECEFF1",
          marginBottom: 10,
        }}
      >
        <Animated.View
          style={{
            width: "15%",
            opacity: 0.5,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX3 }],
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height:70,
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#ECEFF1",
        }}
      >
        <Animated.View
          style={{
            width: "15%",
            opacity: 0.5,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX3 }],
          }}
        />
      </View>
    </View>
  );
};

export default memo(ReviewCard);
