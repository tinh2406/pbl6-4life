import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons"
import { useEffect, useRef, useState } from "react";
import { Image, Text, View, useWindowDimensions } from "react-native"
import { Swipeable } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
export const config = {
    duration: 200,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
};
export default ({ isLiked }) => {
    const width = useWindowDimensions().width
    const left = useSharedValue(0)
    const style = useAnimatedStyle(() => (
        { left: withTiming(left.value, config) }
    ))
    const [currentImg, setCurrentImg] = useState(0)
    const [imgWidth, setImgWidth] = useState()
    const imgs = [
        "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.png?alt=media&token=5fccaf62-d0a8-44b7-9bdb-13363d5f3333&_gl=1*idzhgn*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIyNTM0My4yLjEuMTY5NjIyNTg4Ny42MC4wLjA.",
        "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/2ddd49a1-7f8d-4d1e-8fa3-5eb649a9c4ae.png?alt=media&token=88ea50a4-23e7-4f6a-9921-9f5001d474ab&_gl=1*16vwjtw*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIzMTY0MC4zLjAuMTY5NjIzMTY0MC42MC4wLjA.",
        "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/e7e7925f-e9fd-4538-bf7f-ac5ca9d101c7.png?alt=media&token=efeb2f29-1289-469d-8f11-65d0c4fd5b37&_gl=1*1q81hp6*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIzMTY0MC4zLjEuMTY5NjIzMTY3Ny4yMy4wLjA.",
    ]
    return (
        <View style={{
            width: width >= 768 ? "19.8%" : "100%",
            aspectRatio:width >= 768 ?  1 / 1.418 : 1 / 1.1,
            backgroundColor: "white",
            margin: width>=768?2:0, 
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
        }}>
            <View
                onLayout={(event) => {
                    setImgWidth(event.nativeEvent.layout.width);
                }}
                style={{
                    width: "100%",
                    borderRadius: 20,
                    overflow: "hidden",
                    position: "relative"
                }}
            >
                <AntDesign
                    name={isLiked ? "heart" : "hearto"}
                    size={20}
                    color={isLiked ? "#FF385C" : "white"}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 10,
                    }}
                />
                <View style={{
                    position: "absolute",
                    zIndex: 10,
                    alignItems: "center",
                    width: "100%",
                    bottom: 10
                }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            width: "30%",
                        }}
                    >
                        {imgs.map((img, i) =>
                            <Octicons key={i} name="dot-fill" style={{ paddingHorizontal: 2 }} size={20} color={i === currentImg ? "#ffffff" : "rgba(42, 42, 42, 0.43)"} />)}
                    </View>
                </View>
                {/* {width > 768 && */}
                    <View style={{
                        position: "absolute",
                        zIndex: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                    }}>
                        <Ionicons name="chevron-back" size={24} style={{ padding: 5, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                            color={currentImg === 0 ? "rgba(0, 0, 0, 0.1)" : "white"}
                            onPress={() => {
                                if (currentImg === 0) return
                                setCurrentImg(i => i - 1)
                                left.value = - (currentImg - 1) * imgWidth
                            }}
                            disabled={currentImg === 0}
                        />
                        <Ionicons name="chevron-forward" size={24} style={{ padding: 5, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                            color={currentImg === imgs.length - 1 ? "rgba(0, 0, 0, 0.1)" : "white"}
                            onPress={() => {
                                if (currentImg === imgs.length - 1) return
                                setCurrentImg(i => i + 1)
                                left.value = - (currentImg + 1) * imgWidth
                            }}
                            disabled={currentImg === imgs.length - 1}
                        />
                    </View>
                    {/* } */}
                <Swipeable
                    onSwipeableWillClose={(e) => {
                        if (e === "right") {
                            if (currentImg === imgs.length - 1) return
                            left.value = - (currentImg + 1) * imgWidth
                            setCurrentImg(currentImg + 1)
                        }
                        else {
                            if (left.value === 0) return
                            left.value = - (currentImg - 1) * imgWidth
                            setCurrentImg(currentImg - 1)
                        }
                    }}
                >
                    <Animated.View
                        style={[{
                            flexDirection: "row",
                        }, style]}
                    >
                        {imgs.map((img, i) =>
                            <Image
                                key={i}
                                source={{ uri: img }}
                                style={{
                                    width: "100%", aspectRatio: 1.314,
                                }}
                                la
                            />)}
                    </Animated.View>
                </Swipeable>
            </View>
            <View style={{
                height: "50%"
            }}
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // alignItems: "",
                    marginTop: 10,
                    height: 64
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "black",
                        width: width > 768 ? "67%" : "80%",

                    }}
                        numberOfLines={2}
                    >
                        An Hai Nguyen
                    </Text>
                    <Text style={{
                        fontSize: 11,
                        color: "black",
                        width: width > 768 ? "33%" : "20%"
                    }}>
                        Available: Yes
                    </Text>
                </View>
                <View style={{
                    height: 36
                }}>
                    <Text style={{
                        color: "#2f2f2f"
                    }}
                        numberOfLines={2}
                    >
                        Ngu Hanh Son district, Da Nang
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        color: "#2f2f2f",
                    }}>$1.360</Text>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <AntDesign name="star" size={20} color="#FFD233" />
                        <Text style={{
                            fontWeight: "bold",
                            color: "#2f2f2f"
                        }}>4.9</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}