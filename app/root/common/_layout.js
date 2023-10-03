import { Stack, Tabs, useNavigation, usePathname } from "expo-router"
import { Text, View } from "react-native"

export default () => {


    return <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle:{
                display:"none"
            },
            contentStyle: {
                width: "100%",
                height: "100%",
                backgroundColor: "#FFF9FA",
            },
            animation: "slide_from_right",
        }}
    >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="private" />
    </Tabs>
}