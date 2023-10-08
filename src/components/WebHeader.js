import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router, usePathname } from "expo-router"
import { Image, Pressable, Text, View } from "react-native"
import { useAuth } from "../context/AuthContext"

export default () => {
    const { user } = useAuth()
    const a = usePathname()
    console.log(user, a);
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                height: 70,
                backgroundColor: "white",
            }}
        >
            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 50
                }}
                onPress={() => { router.replace("root") }}
            >
                <MaterialCommunityIcons name="home-roof" size={40} color="#FF385C" />
                <Text
                    style={{
                        fontSize: 24,
                        color: '#FF385C'
                    }}
                >4LIFE</Text>
            </Pressable>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "20%",
                    justifyContent: "space-evenly",
                }}
            >
                {/* <Pressable>
                    <Text
                        style={{
                            color: "#FF385C",
                            fontWeight: "bold"
                        }}
                    >
                        Home
                    </Text>
                </Pressable>
                <Pressable>
                    <Text>
                        About
                    </Text>
                </Pressable> */}
            </View>
            <View>
                {user ?
                    <Pressable
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 50,
                            borderColor: "#bfbfbf",
                        }}
                    >
                        <Image
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/tinh.jpg?alt=media&token=36e93d04-5110-493d-9940-bda39bbe8b8b&_gl=1*1bc07mb*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjI2MDc2OS40LjEuMTY5NjI2MDgwMC4yOS4wLjA.' }}
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: "#686868"
                            }}
                        />
                        <Text
                            style={{
                                fontWeight: "bold",
                                marginLeft: 10,
                                color: "#525252",

                            }}
                        >User</Text>
                    </Pressable>
                    :
                    <View style={{
                        flexDirection:"row"

                    }}>
                        <Pressable
                            style={{
                                padding:8,
                                paddingHorizontal:12,
                                borderRadius:50,
                                borderWidth:1,
                                borderColor:"#ff385c",
                                justifyContent:"center",
                            }}
                            onPress={()=>{router.replace("/root/authen/register")}}
                        >
                            <Text
                                style={{
                                    color:"#ff385c",
                                    fontWeight:"bold",
                                }}
                            >Sign up</Text>
                        </Pressable>
                        <Pressable
                            style={{
                                padding:8,
                                paddingHorizontal:16,
                                borderRadius:50,
                                backgroundColor:"#ff385c",
                                justifyContent:"center",
                                marginLeft:8
                            }}
                            onPress={()=>{router.replace("/root/authen/login")}}
                        >
                            <Text
                                style={{
                                    color:"white",
                                    fontWeight:"bold",
                                }}
                            >Login</Text>
                        </Pressable>
                    </View>

                }
            </View>
        </View>
    )
}