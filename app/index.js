import { router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../src/context/AuthContext";
import Loading from "../src/screens/Loading";


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
