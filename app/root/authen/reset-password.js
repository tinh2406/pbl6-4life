import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, router, useNavigation, useRouter } from "expo-router"
import { useState } from "react"
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View, useWindowDimensions } from "react-native"
import { useAuth } from "../../../src/context/AuthContext"

export default () => {
    const [password, setPassword] = useState("admin")
    const [rePassword, setRePassword] = useState("admin")
    const [showPass, setShowPass] = useState(false)
    const navigation = useNavigation()
    const email = navigation.getState().routes[1].params?.email
    const width = useWindowDimensions().width

    const handleResetPW = async ()=>{
        if(!email || password==="" || password!==rePassword) return

        if(email==="admin" && password==="admin") {
            router.push("/root/authen/login")
        }

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
                            marginTop: 10,
                            marginLeft: 30,
                            marginRight: 50
                        }}>
                            <Ionicons name="arrow-back" size={28} color="black"
                                style={{ padding: 5, left: -5 }}
                                onPress={() => router.back()}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#5e2832",
                                    marginTop: 10
                                }}>Type new password for {email}</Text>
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
                                onChangeText={(text) => setRePassword(text)}
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
                        </View>
                    </View>


                    <Pressable
                        style={{
                            marginTop: 20,
                            marginHorizontal: 40,
                            marginBottom: 40
                        }}
                    onPress={handleResetPW}
                    >
                        <View
                            style={{
                                padding: 12,
                                backgroundColor: '#FF385C',
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "white",
                                }}
                            >Reset password</Text></View>
                    </Pressable>
                </KeyboardAvoidingView >

               
            </View>
        </View>
    )
}