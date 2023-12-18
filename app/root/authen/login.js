import { AntDesign, Feather, MaterialCommunityIcons } from "react-native-vector-icons"
import { router, useNavigation } from "expo-router"
import { useEffect, useState } from "react"
import { Keyboard, KeyboardAvoidingView, Pressable, Text, TextInput, View, useWindowDimensions } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { useAuth } from "../../../src/context/AuthContext"
import Loading from "../../../src/screens/Loading"
import validateEmail from "../../../src/utils/validateEmail"


export default () => {

    const width = useWindowDimensions().width
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [keepSignIn, setKeepSignIn] = useState(true)
    const { onForgetPW, onLogin, onGG } = useAuth()
    const navigation = useNavigation()

    const [emailError, setEmailError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    useEffect(() => {
        const email = navigation.getState().routes[0]?.params?.email
        if (email) setEmail(email)
    }, [])

    const handleForget = async () => {
        if (email === "") {
            setEmailError("Please enter email")
            return
        }
        setLoading(true)
        const res = await onForgetPW(email)
        if (res.success) {
            toast.show("Please check your email", {
                type: "success",
                placement: "top",
            })
            navigation.navigate("verify", { email })
        }
        else if (res.message) {
            toast.show(res.message, {
                type: "danger",
                placement: "top",
            })
        }
        setLoading(false)
    }
    const handleLogin = async () => {
        Keyboard.dismiss()
        if (emailError || email === "" || password === "")
            return
        setLoading(true)
        const res = await onLogin(email, password,keepSignIn)
        if (res.success) {
            toast.show(`Welcome ${res.user.name}`, {
                type: "success",
                placement: "top",
            })
            setLoading(false);
            if(router.canGoBack())
            router.back()
            else
            router.replace("/root/common")
        }
        else if (res.message) {
            toast.show(res.message, {
                type: "danger",
                placement: "top",
            })
        }
        setLoading(false)
    }

    const handleLoginWithGG = async () => {
        await onGG()
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
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                        marginLeft: 30,
                        marginRight: 50
                    }}>
                        <MaterialCommunityIcons
                            name="email-edit-outline" size={32} color="#FF385C"
                            style={{
                                marginRight: 20,
                            }}
                        />
                        <TextInput
                            placeholder="Email Address"
                            style={{
                                color: "#FF385C",
                                padding: 10,
                                backgroundColor: "white",
                                flex: 1,
                                borderRadius: 10,
                                fontSize: 16

                            }}
                            placeholderTextColor="#ff8fa2"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            onBlur={() => {
                                if (validateEmail(email)) {
                                    setEmailError()
                                } else {
                                    setEmailError("Invalid email")
                                }
                            }}
                        />
                        <MaterialCommunityIcons
                            name="close" size={24} color="#FF385C"
                            style={{
                                position: "absolute",
                                right: 10,
                                padding: 5,
                                display: email === "" ? "none" : "flex"
                            }}
                            onPress={() => setEmail("")}
                        />
                        <Text
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: 60,
                                fontSize: 12,
                                padding: 5,
                                color: "#ff6c28",
                                fontWeight: "bold",
                            }}
                        >{emailError}</Text>
                    </View>
                </View>
                <View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                        marginLeft: 30,
                        marginRight: 50
                    }}>
                        <MaterialCommunityIcons
                            name="lock-outline" size={32} color="#FF385C"
                            style={{
                                marginRight: 20,
                            }}
                        />

                        <TextInput
                            placeholder="Password"
                            style={{
                                color: "#FF385C",
                                padding: 10,
                                backgroundColor: "white",
                                flex: 1,
                                borderRadius: 10,
                                fontSize: 16

                            }}
                            secureTextEntry={!showPass}
                            placeholderTextColor="#ff8fa2"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            onBlur={() => {
                                if (password === "") {
                                    setPasswordError("Password is required")
                                }
                                else {
                                    setPasswordError()
                                }
                            }}
                        />
                        <MaterialCommunityIcons
                            name={showPass ? "eye" : "eye-off"} size={24} color="#FF385C"
                            style={{
                                position: "absolute",
                                right: 10,
                                padding: 5,
                                display: password === "" ? "none" : "flex"
                            }}
                            onPress={() => setShowPass(!showPass)}
                        />
                        <Text
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: 60,
                                fontSize: 12,
                                padding: 5,
                                color: "#ff6c28",
                                fontWeight: "bold",
                            }}
                        >{passwordError}</Text>
                    </View>
                </View>
                <View>
                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                        marginLeft: 20,
                    }}
                        onPress={() => setKeepSignIn(!keepSignIn)}

                    >
                        <Feather
                            name={keepSignIn ? "check-square" : "square"} size={20}
                            color="#FF385C"
                            style={{
                                padding: 5,
                                display: keepSignIn === "" ? "none" : "flex"
                            }}
                        />
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "#FF385C"
                            }}
                        >Keep sign in?</Text>

                    </Pressable>
                </View>
                <View
                    style={{
                        alignItems: "flex-end",
                        marginTop: 12
                    }}
                >
                    <Pressable
                        onPress={handleForget}
                        style={{
                            right: 60,
                        }}
                    >
                        <Text
                            style={{
                                color: "#FF385C",
                                fontSize: 12
                            }}
                        >Forgot password?</Text>
                    </Pressable>
                </View>
                <Pressable
                    onPress={handleLogin}
                    style={{
                        marginTop: 20,
                        marginHorizontal: 40,
                        marginBottom: 40
                    }}
                >
                    <View
                        style={{
                            padding: 12,
                            backgroundColor: (email === "" || password === "") ? "#929292" : '#FF385C',
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    ><Text
                        style={{
                            fontSize: 24,
                            color: "white",
                        }}
                    >Sign in</Text></View>
                </Pressable>
            </KeyboardAvoidingView >
            <View style={{
                width: width >= 1200 ? "80%" : "100%"
            }}>
                <Pressable
                    onPress={handleLoginWithGG}
                    style={{
                        marginHorizontal: 40,
                        marginBottom: 40
                    }}
                // disabled={!request}
                >
                    <View
                        style={{
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#787576',
                            backgroundColor: '#fff7f8',
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row"
                        }}
                    >
                        <AntDesign name="google" size={24} color="#787576" />
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#787576",
                                marginLeft: 10
                            }}
                        >Login with Google</Text></View>
                </Pressable>
            </View>
            <View
                style={{
                    marginTop: 20,
                    alignItems: "center",
                }}
            >
                <Text>You don't have account?</Text>
                <Pressable
                    onPress={() => { router.replace("/root/authen/register") }}
                >
                    <Text style={{
                        fontWeight: "600",
                        color: "#FF385C"
                    }}>
                        Register now
                    </Text>
                </Pressable>
            </View>
            {loading && <Loading />}
        </View>
    )
}