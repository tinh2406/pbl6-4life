import { Tabs } from "expo-router"
import { View, useWindowDimensions } from "react-native"
import WebHeader from "../../../src/components/WebHeader"

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