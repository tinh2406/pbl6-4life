import { Stack, Tabs } from "expo-router"

export default ()=>{
    return <Stack
        initialRouteName="index"
        screenOptions={{
            headerShown: false,
            animation:"slide_from_right",
        }}
    >
    </Stack>
}