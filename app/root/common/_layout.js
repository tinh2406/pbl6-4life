import { Stack, Tabs, useNavigation, usePathname } from "expo-router"
import { Text, View, useWindowDimensions } from "react-native"
import WebHeader from "../../../src/components/WebHeader"
import WebFilter from "../../../src/components/WebFilter"

export default () => {
    const width = useWindowDimensions().width
    return (
        <>
            {width >= 768 && <View style={{}}>
                <WebHeader />
            </View>}
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        display: "none"
                    },
                    contentStyle: {
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FFF9FA",
                    },
                }}
            >
                <Tabs.Screen name="home" />
                <Tabs.Screen name="private" />
            </Tabs>
        </>
    )
}