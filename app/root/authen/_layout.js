import { Redirect, Stack, router } from "expo-router"
import { useAuth } from "../../../src/context/AuthContext"
import { Ionicons } from "@expo/vector-icons"

export default ()=>{
    const {authState} = useAuth()
    if(authState.authenticated)
    return <Redirect href={"/root/common"}/>
    return(
        <>
        <Ionicons name="close" size={32} color="#ff385c" style={{position:"absolute",top:40,left:40,zIndex:1}}
            onPress={()=>{router.replace("/root/common")}}
        />
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
        </>
    )
}