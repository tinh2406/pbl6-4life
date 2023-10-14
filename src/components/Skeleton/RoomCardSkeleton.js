import { memo, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "react-native";
import { useWindowDimensions } from "react-native";


const RoomCard = () => {
    const width = useWindowDimensions().width

    const circleAnimatedValue = useRef(new Animated.Value(0)).current
    const [timeOutId,setTimeoutId] = useState()
    const circleAnimated = () => {
        circleAnimatedValue.setValue(0)
        Animated.timing(
            circleAnimatedValue,
            {
                toValue: 1,
                duration: 600,
                useNativeDriver: false,
            }
        ).start(() => {
            const id = setTimeout(() => {
                circleAnimated()
            }, 700);
            setTimeoutId(id);
        })
    }
    const translateMini = circleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 80]
    })
    const translateX = circleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 100]
    })

    const translateX2 = circleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 250]
    })
    const translateX3 = circleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 350]
    })

    useEffect(() => {
        circleAnimated()
        return()=>{
            if(timeOutId) clearTimeout(timeOutId)
        }
    }, [])

    return (
        <View
            style={{
                width: width >= 1200 ? "19.8%" : width >= 892 ? "24.9%" : width >= 640 ? "33%" : "100%",
                aspectRatio: width >= 640 ? 1 / 1.418 : 1 / 1.15,
                backgroundColor: "white",
                margin: width >= 640 ? 2 : 0,
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
                    borderRadius: 20,
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: 1.314,
                    backgroundColor: "#ECEFF1"
                }}
            >
                <Animated.View style={{ width: "15%", opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateX3 }] }} />
            </View>
            <View style={{
                height: "50%",
                width: "100%",
            }}
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    height: 64
                }}>
                    <View style={{
                        width: width > 640 ? "60%" : "70%",
                        backgroundColor: "#ECEFF1",
                        height: 36
                    }}
                    >
                        <Animated.View style={{ width: '15%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateX2 }] }} />
                    </View>
                    <View style={{
                        width: width > 640 ? "35%" : "25%",
                        backgroundColor: "#ECEFF1",
                        height: 20
                    }} >
                        <Animated.View style={{ width: '15%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateX }] }} />
                    </View>
                </View>
                <View style={{
                    height: 28,
                    backgroundColor: "#ECEFF1"
                }}>
                    <Animated.View style={{ width: '15%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateX3 }] }} />
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center", marginTop: 10
                }}>
                    <View style={{
                        height: 20,
                        backgroundColor: "#ECEFF1",
                        width: 50,

                    }}>
                        <Animated.View style={{ width: '30%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateMini }] }} />
                    </View>
                    <View style={{
                        height: 20,
                        backgroundColor: "#ECEFF1",
                        width: 50,

                    }}>
                        <Animated.View style={{ width: '30%', opacity: 0.5, height: '100%', backgroundColor: 'white', transform: [{ translateX: translateMini }] }} />
                    </View>
                </View>
            </View>
        </View>
    )
}



export default memo(RoomCard)