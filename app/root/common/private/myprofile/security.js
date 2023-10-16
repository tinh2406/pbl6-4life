import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { View, Text, Pressable, Image, ScrollView, KeyboardAvoidingView } from "react-native"
import { Email, Password } from "../../../../../src/components/EditSecurity"
import { useUser } from "../../../../../src/context/UserContext"
import { useCallback, useRef, useState } from "react"

export default () => {

    const { user } = useUser()
    const scrollRef = useRef()
    const [yPassword,setYPassword] = useState(0)
    const scrollToPassword = useCallback(()=>{
        scrollRef.current.scrollTo({y:yPassword})
    },[yPassword,scrollRef])
    return (
        <View
            style={{ height: '100%', backgroundColor: '#fafeff' }}
        >
            <ScrollView
                style={{
                    flex: 1
                }}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    marginTop: 20,
                    paddingBottom:400
                }}
                ref={scrollRef}

            >
                <Ionicons name="chevron-back" size={20} color={"#6b6b6b"}
                    onPress={() => { router.back() }}
                    style={{
                        // padding: 20
                    }}
                />

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "700",
                    }}
                >Login & security</Text>

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
                </View>

                <Email email={user?.email} />
                <Password scroll={scrollToPassword}/>
                <View onLayout={(e)=>{setYPassword(e.nativeEvent.layout.y)}}/>
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
                                style={{ fontSize: 14, marginTop: 2 }}
                            >Deactivate your account</Text>
                        </View>
                        <Pressable>
                            <Text
                                style={{ fontWeight: "500", fontSize: 14, color: "#e54a36" }}
                            >
                                Deactivate
                            </Text>
                        </Pressable>
                    </View>
                    {/* </View> */}
                </View>
            </ScrollView>
        </View>
    )
}