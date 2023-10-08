import { Redirect, Slot, Stack, Tabs, useFocusEffect, useNavigation } from "expo-router"
import { useAuth } from "../../../../src/context/AuthContext"
import { useWindowDimensions } from "react-native"
import ModalLogin from "../../../../src/components/ModalLogin"
import { useCallback, useEffect, useState } from "react"

export default () => {
    const { width } = useWindowDimensions().width
    const { authState } = useAuth()
    if (width >= 768)
        if (!authState.authenticated)
            return <Redirect href={"/root/authen"} />
    const [modalVisible,setModalVisible] = useState(!authState.authenticated)
    useFocusEffect(useCallback(()=>{
        setModalVisible(!authState.authenticated)
    },[authState]))
    return (
        <>
            <ModalLogin
                visible={modalVisible}
                hidden={()=>setModalVisible(false)}
            />
            <Slot />
        </>
    )
}