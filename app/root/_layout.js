import { Stack } from "expo-router"

export default ()=>{
    return(
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="common"/>
            <Stack.Screen name="authen"/>
        </Stack>
    )
}