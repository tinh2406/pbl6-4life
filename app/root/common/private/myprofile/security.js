import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { View, Text, Pressable, Image } from "react-native"
import { Email, Password } from "../../../../../src/components/EditSecurity"
import { useUser } from "../../../../../src/context/UserContext"

export default () => {

    const {user} = useUser()

    return (
        <View
            style={{ height: '100%', backgroundColor: '#fafeff' }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                <Ionicons name="chevron-back" size={20} color={"#6b6b6b"}
                    onPress={() => { router.back() }}
                    style={{
                        padding: 20
                    }}
                />

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "700",
                        marginHorizontal: 20
                    }}
                >Login & security</Text>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginTop: 20,
                    }}
                >

                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "500",
                            marginBottom: 12
                        }}>
                            Login
                        </Text>
                        
                        <Email email={user?.email}/>
                        <Password/>
                    </View>
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "500",
                            marginBottom: 12
                        }}>
                            Account
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            borderBottomWidth: 1,
                            paddingVertical: 16,
                            borderColor: "#d4d4d4"
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text
                                    style={{fontSize: 14, marginTop: 2 }}
                                >Deactivate your account</Text>
                            </View>
                            <Pressable>
                                <Text
                                    style={{ fontWeight: "500", fontSize: 14,color: "#e54a36" }}
                                >
                                    Deactivate
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}