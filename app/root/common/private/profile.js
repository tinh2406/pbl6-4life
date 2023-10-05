import { Pressable, Text, View, useWindowDimensions } from "react-native"
import TabBar from "../../../../src/components/TabBar"
import { useAuth } from "../../../../src/context/AuthContext"

export default ()=>{
    const {user} = useAuth()
    const width = useWindowDimensions().width
    return(
        <View
            style={{height: '100%'}}
        >
            <View
                style={{
                    flex:1
                }}
            >
                {user ?
                    <View /> :
                    <>
                        <View
                            style={{
                                marginTop: 30,
                                marginHorizontal: 30
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "700",
                                }}
                            >Your profile</Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                    paddingTop: 40,

                                }}
                            >Login to your profile</Text>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingTop: 50,
                            }}>
                                <Pressable
                                    style={{
                                        width: "70%",
                                    }}
                                    onPress={() => {
                                        router.replace("root/authen")
                                    }}
                                ><Text
                                    style={{
                                        fontWeight: "600",
                                        color: "white",
                                        paddingVertical: 14,
                                        paddingHorizontal: 20,
                                        backgroundColor: "#ff385c",
                                        borderRadius: 20,
                                        textAlign: "center"
                                    }}
                                >Login</Text></Pressable>

                            </View>
                        </View>
                    </>}
            </View>
            {width >= 768 ||
            <TabBar currentScreen={"profile"}/>
            }
        </View>
    )
}