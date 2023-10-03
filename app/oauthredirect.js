import { Text, View } from "react-native"
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import Loading from "../src/screens/Loading";
import { useAuth } from "../src/context/AuthContext";
export default () => {

    const {loading} = useAuth()
    useEffect(() => {
        if(!loading){
            router.replace("/root")
        }
    }, [loading])


    return (
        <Loading/>
    )
}