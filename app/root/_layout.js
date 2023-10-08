import { Stack } from "expo-router"

const config = {
    animation: 'timming',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

export default () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation:"slide_from_right",
            }}
        >
            <Stack.Screen name="common"
                options={{
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            />
            <Stack.Screen name="authen" />
        </Stack>
    )
}