import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, router, useNavigation, useRouter } from "expo-router"
import { useState } from "react"
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View, useWindowDimensions } from "react-native"
import { useAuth } from "../../../src/context/AuthContext"
import validateEmail from "../../../src/utils/validateEmail"
import { useToast } from "react-native-toast-notifications"
import Loading from "../../../src/screens/Loading"
export default () => {


    const { onRegister, onGG } = useAuth()
    const [email, setEmail] = useState("Nqt@gmail.com")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("Tinh@24")
    const [rePassword, setRePassword] = useState("Tinh@24")
    const [showPass, setShowPass] = useState(false)
    const width = useWindowDimensions().width
    const toast = useToast()
    const [emailError, setEmailError] = useState()
    const [usernameError, setUsernameError] = useState()
    const [passwordError, setPasswordError] = useState()
    const [rePasswordError, setRePasswordError] = useState()
    const [loading,setLoading] = useState(false)
    const handleSignUp = async () => {
        Keyboard.dismiss()
        setLoading(true)
        if (emailError || email === "" || username==="" || password === "" || rePassword !== password)
            return

        const res = await onRegister(email, username, password)
        if (res.success) {
            toast.show("Register successfully",{
                type:"success",
                placement: "top",
            })
            setLoading(false);
            router.replace("/root/authen/login")
            router.setParams({ email })
        }
        else if (res.message){
            toast.show(res.message,{
                type:"danger",
                placement: "top",
            })
        }
        setLoading(false)
    }
    const handleLoginWithGG = async () => {
        await onGG();
    }
    return (
        <View
            style={{
                flexDirection: "row",
                marginLeft: width >= 768 ? 20 : 0,
                // alignItems: "center",
            }}
        >
            {width >= 768
                &&
                <Image
                    source={{ uri: "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/anhnen.png?alt=media&token=c24d5b04-26a4-4b2c-b98b-06adbe16836f&_gl=1*qes2cq*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjE0NTkwMC4xLjEuMTY5NjE0NjE4OC4zNy4wLjA." }}
                    style={{
                        width: "50%",
                        aspectRatio: 1,
                        marginTop: 25
                    }}
                />
            }
            <View
                style={{
                    width: width >= 768 ? "50%" : "100%",
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
                            marginTop: 50,
                            marginBottom: 30
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
                            marginTop: 10,
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
                                    bottom:-20,
                                    left:60,
                                    fontSize:12,
                                    padding: 5,
                                    color:"#ff6c28",
                                    fontWeight:"bold",
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
                            <Ionicons
                                name="ios-person-circle-outline" size={32} color="#FF385C"
                                style={{
                                    marginRight: 20,
                                }}
                            />
                            <TextInput
                                placeholder="Username"
                                style={{
                                    color: "#FF385C",
                                    padding: 10,
                                    backgroundColor: "white",
                                    flex: 1,
                                    borderRadius: 10,
                                    fontSize: 16

                                }}
                                placeholderTextColor="#ff8fa2"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                onBlur={()=>{
                                    if(username===""){
                                        setUsernameError("Name is required")
                                    }else{
                                        setUsernameError()
                                    }
                                }}
                            />
                            <MaterialCommunityIcons
                                name="close" size={24} color="#FF385C"
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    padding: 5,
                                    display: username === "" ? "none" : "flex"
                                }}
                                onPress={() => setUsername("")}
                            />
                            <Text
                                style={{
                                    position: "absolute",
                                    bottom:-20,
                                    left:60,
                                    fontSize:12,
                                    padding: 5,
                                    color:"#ff6c28",
                                    fontWeight:"bold",
                                }}
                            >{usernameError}</Text>
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
                                onBlur={()=>{
                                    if (password===""){
                                        setPasswordError("Password is required")
                                    }
                                    else{
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
                                    bottom:-20,
                                    left:60,
                                    fontSize:12,
                                    padding: 5,
                                    color:"#ff6c28",
                                    fontWeight:"bold",
                                }}
                            >{passwordError}</Text>
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
                            <Feather
                                name="repeat" size={26} color="#FF385C"
                                style={{
                                    padding: 3,
                                    marginRight: 20,
                                }}
                            />

                            <TextInput
                                placeholder="Repeat password"
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
                                value={rePassword}
                                onChangeText={(text) => {
                                    setRePassword(text)
                                    if(rePasswordError){
                                        if(text===password){
                                            setRePasswordError()
                                        }
                                    }
                                }}
                                onBlur={() => {
                                    if(rePassword!==password){
                                        setRePasswordError("Passwords do not match")
                                    }
                                    else{
                                        setRePasswordError()
                                    }
                                }}
                            />
                            <MaterialCommunityIcons
                                name="close" size={24} color="#FF385C"
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    padding: 5,
                                    display: rePassword === "" ? "none" : "flex"
                                }}
                                onPress={() => setRePassword("")}
                            />
                            <Text
                                style={{
                                    position: "absolute",
                                    bottom:-20,
                                    left:60,
                                    fontSize:12,
                                    padding: 5,
                                    color:"#ff6c28",
                                    fontWeight:"bold",
                                }}
                            >{rePasswordError}</Text>
                        </View>
                    </View>


                    <Pressable
                        style={{
                            marginTop: 20,
                            marginHorizontal: 40,
                            marginBottom: 40
                        }}
                        onPress={handleSignUp}
                    >
                        <View
                            style={{
                                padding: 12,
                                backgroundColor: '#FF385C',
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        ><Text
                            style={{
                                fontSize: 24,
                                color: "white",
                            }}
                        >Sign up</Text></View>
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
                    <Text>You already have an account?</Text>
                    <Pressable
                        onPress={() => { router.replace("/root/authen/login") }}
                    >
                        <Text style={{
                            fontWeight: "600",
                            color: "#FF385C"
                        }}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </View>
            {loading && <Loading/>}
        </View>
    )
}