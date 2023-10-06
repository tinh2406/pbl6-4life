import { Ionicons } from "@expo/vector-icons"
import { Redirect, Stack, router } from "expo-router"
import { Image, View, useWindowDimensions } from "react-native"
import { useAuth } from "../../../src/context/AuthContext"

export default () => {
    const { authState } = useAuth()
    const width = useWindowDimensions().width
    if (authState.authenticated)
        return <Redirect href={"/root/common"} />
    return (
        <View
            style={{
                flexDirection: "row",
                marginLeft: width >= 768 ? 20 : 0,
                height: "100%"
                // alignItems: "center",
            }}
        >
            <Ionicons name="close" size={32} color="#ff385c" style={{ position: "absolute", top: 40, left: 40, zIndex: 1 }}
                onPress={() => { router.replace("/root/common") }}
            />
            {width >= 768
                &&
                <Image
                    source={{ uri: "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/anhnen.png?alt=media&token=c24d5b04-26a4-4b2c-b98b-06adbe16836f&_gl=1*qes2cq*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjE0NTkwMC4xLjEuMTY5NjE0NjE4OC4zNy4wLjA." }}
                    style={{
                        width: "50%",
                        aspectRatio: 1,
                        marginTop: 25
                    }}
                />
            }
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FFF9FA",
                    },
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="verify" />
                <Stack.Screen name="reset-password" />
            </Stack>
        </View>
    )
}