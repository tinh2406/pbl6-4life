import { Slot } from "expo-router"
import { AuthProvider, useAuth } from "../src/context/AuthContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"
import { ToastProvider } from "react-native-toast-notifications"
import {AntDesign,Ionicons,MaterialIcons,Feather,FontAwesome} from "react-native-vector-icons"
// import {AntDesign,Ionicons,MaterialIcons,Feather,FontAwesome} from "@expo/vector-icons"
import * as Font from 'expo-font';
import Loading from "../src/screens/Loading"
import { useEffect, useState } from "react"


import { en, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', en)

export default () => {
    const height = useWindowDimensions().height
    const [resourceLoading,setResouceLoading] = useState(true)
    useEffect(()=>{
        const loadResouces = async () => {
            try {
                await Font.loadAsync({
                    ...Ionicons.font,
                    ...AntDesign.font,
                    ...MaterialIcons.font,
                    ...Feather.font,
                    ...FontAwesome.font,
                  });
            } catch (error) {
                
            }
            finally{
                setResouceLoading(false);
            }
        }
        loadResouces()
    },[])
    return (
        <AuthProvider>
            <ToastProvider>
            <SafeAreaView
                style={{ 
                    height,
                    backgroundColor: '#FFF9FA'
                 }}>
                {resourceLoading&&
                <Loading/>}
                <Slot />
                
            </SafeAreaView>
            </ToastProvider>
        </AuthProvider>
    )
}