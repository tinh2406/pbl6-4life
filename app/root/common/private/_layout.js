import { Redirect, Slot, Stack, Tabs, useNavigation } from "expo-router"
import { useAuth } from "../../../../src/context/AuthContext"

export default () => {

    const { authState } = useAuth()
    if (!authState.authenticated)
        return <Redirect href={"/root/authen"} />
    return (
            <Slot/>
    )
}