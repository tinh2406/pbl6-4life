import { Redirect } from "expo-router";
import { useAuth } from "../src/context/AuthContext";
import Loading from "../src/screens/Loading";


export default () => {
    const {loading} = useAuth()

    if(loading){
        return <Loading/>
    }

    return (
        <Redirect href={"root"}/>
    )
}
