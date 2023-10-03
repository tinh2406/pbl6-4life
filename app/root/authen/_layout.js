import { Redirect, Stack } from "expo-router"
import { useAuth } from "../../../src/context/AuthContext"

export default ()=>{
    const {authState} = useAuth()
    if(authState.authenticated)
    return <Redirect href={"/root/common"}/>
    return(
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FFF9FA",
                },
                animation:"slide_from_right",
            }}
            >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="verify" />
            <Stack.Screen name="reset-password" />
        </Stack>
    )
}