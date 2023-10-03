import { Slot } from "expo-router"
import { AuthProvider, useAuth } from "../src/context/AuthContext"
import { SafeAreaView } from "react-native-safe-area-context"
import { useWindowDimensions } from "react-native"
import { ToastProvider } from "react-native-toast-notifications"

export default () => {
    const height = useWindowDimensions().height

    return (
        <AuthProvider>
            <ToastProvider>
            <SafeAreaView
                style={{ 
                    height,
                    backgroundColor: '#FFF9FA'
                 }}>
                <Slot />
            </SafeAreaView>
            </ToastProvider>
        </AuthProvider>
    )
}