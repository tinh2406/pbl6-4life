import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Redirect, router, useNavigation } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, KeyboardAvoidingView, Pressable, Text, TextInput, View, useWindowDimensions } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { useAuth } from "../../../src/context/AuthContext"

export default () => {
    const toast = useToast()
    const [otp, setOTP] = useState("0000")
    const [loading, setLoading] = useState(false)
    const [reSendLoading, setResendLoading] = useState(false)
    const navigation = useNavigation()
    const preScreen = navigation.getState().routes[0].name
    const width = useWindowDimensions().width
    if (preScreen === "verify") {
        return <Redirect href={"/root"} />
    }
    const email = navigation.getState().routes[1].params.email
    const { onVerify, onForgetPW } = useAuth()
    const handleSubmit = async () => {
        if (!email || otp === "") {
            return
        }
        setLoading(true)
        const res = await onVerify(email, otp)
        if (res.success) {
            if (preScreen === "login") {
                router.replace("/root/authen/reset-password")
                router.setParams({ email, otp })
            }
        } else if (res.message) {
            toast.show(res.message, {
                type: 'danger',
                placement: 'top',
            })
        }
        setLoading(false)
    }
    const handleResendCode = async () => {
        if (!email) {
            return
        }
        setResendLoading(true)
        const res = await onForgetPW(email)
        if (res.success) {
            toast.show("Sent code successfully");
        }
        setResendLoading(false)
    }
    return (

        <View
            style={{
                width: "100%",
                alignItems: "center",
            }}
        >
            <KeyboardAvoidingView
                behavior="position"
                style={{
                    width: width >= 1200 ? "80%" : "100%"
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 50
                    }}
                >
                    <MaterialCommunityIcons name="home-roof" size={72} color="#FF385C" />
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#FF385C'
                        }}
                    >4LIFE</Text>
                </View>
                <View>
                    <View style={{
                        marginLeft: 30,
                        marginRight: 50
                    }}>
                        <Ionicons name="arrow-back" size={28} color="black"
                            style={{ padding: 5, left: -5 }}
                            onPress={() => router.back()}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#ff385c",
                                fontWeight: "600"
                            }}
                        >
                            Confirm your account</Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#5e2832",
                                marginTop: 10
                            }}
                        >We sent a code via your email. Enter that code to confirm your account.</Text>
                    </View>
                </View>
                <View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                        marginLeft: 30,
                        marginRight: 40
                    }}>
                        <TextInput
                            placeholder="Enter code"
                            style={{
                                color: "#FF385C",
                                padding: 10,
                                backgroundColor: "white",
                                flex: 1,
                                borderRadius: 10,
                                fontSize: 16

                            }}
                            placeholderTextColor="#ff8fa2"
                            value={otp}
                            onChangeText={(text) => setOTP(text)}
                        />
                        <MaterialCommunityIcons
                            name="close" size={24} color="#FF385C"
                            style={{
                                position: "absolute",
                                right: 10,
                                padding: 5,
                                display: otp === "" ? "none" : "flex"
                            }}
                            onPress={() => setOTP("")}
                        />
                    </View>
                </View>

                <Pressable
                    style={{
                        marginTop: 20,
                        marginHorizontal: 40,
                        marginBottom: 40
                    }}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <View
                        style={{
                            padding: 12,
                            marginTop: 20,
                            backgroundColor: (otp === "") ? "#929292" : '#FF385C',
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {loading ? <ActivityIndicator size={30} color={"white"} /> :
                            <Text
                                style={{
                                    fontSize: 24,
                                    color: "white",
                                }}
                            >Continue</Text>
                        }
                    </View>
                </Pressable>
            </KeyboardAvoidingView >

            <Pressable
                onPress={handleResendCode}
                style={{
                    marginTop: 20,
                    alignItems: "center",
                }}
                disabled={reSendLoading}
            >
                <Text style={{
                    fontWeight: "600",
                    color: reSendLoading ? "gray" : "#2c2c2c"
                }}>
                    Send Code Again
                </Text>
            </Pressable>
        </View>
    )
}