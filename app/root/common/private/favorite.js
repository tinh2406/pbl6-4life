import { Pressable, Text, View, useWindowDimensions } from "react-native"
import TabBar from "../../../../src/components/TabBar"
import { useAuth } from "../../../../src/context/AuthContext"
import { router } from "expo-router"

export default () => {
    const { user } = useAuth()
    const width = useWindowDimensions().width
    return (
        <View
            style={{ height: '100%' }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                {user ?
                    <>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: "100%",
                        paddingHorizontal: 20
                    }}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={({ item }) => (
                        <RoomCard />
                    )}
                    //Setting the number of column
                    numColumns={width >= 1200 ? 5 : width >= 892 ? 4 : width > 640 ? 3 : 1}
                    key={width >= 1200 ? "5" : width >= 892 ? "4" : width > 640 ? "3" : "1"}
                    keyextractor={(item, i) => "_" + i}
                />
                    </> :
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
                            >Wishlists</Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                    paddingTop: 40,

                                }}
                            >Login to view wishlists</Text>
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
            <TabBar currentScreen={"favorite"} />
            }
        </View>
    )
}