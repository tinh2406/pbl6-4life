import { Ionicons } from "react-native-vector-icons"
import { Stack, router } from "expo-router"
import { View, useWindowDimensions } from "react-native"
import { useAuth } from "../../../src/context/AuthContext"

export default () => {
    const { authState } = useAuth()
    const width = useWindowDimensions().width

    // if (authState.authenticated)
    //     return <Redirect href={"/root/common"} />
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
                onPress={() => {
                    if (router.canGoBack())
                        router.back()
                    else router.replace("/root/common")
                }}
            />
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