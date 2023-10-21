import { router } from "expo-router"
import { FlatList, Pressable, Text, TextInput, View, useWindowDimensions } from "react-native"
import RoomCard from "../../../../src/components/RoomCard"
import TabBar from "../../../../src/components/TabBar"
import { useUser } from "../../../../src/context/UserContext"

export default () => {
    const { user } = useUser()
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
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "700",
                        marginTop: 30,
                        marginHorizontal: 30
                    }}
                >Wishlists</Text>
                <TextInput
                    placeholder="Type name"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                        borderRadius: 50,
                        margin: 10,
                        padding: 12,
                        backgroundColor: "white"
                    }}
                />
                {user ?
                    <>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            bounces={false}
                            alwaysBounceHorizontal={false}
                            alwaysBounceVertical={false}
                            showsVerticalScrollIndicator={false}
                            style={{
                                width: "100%"
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
                    </>
                    :
                    <>
                        <View
                            style={{
                                marginHorizontal: 30
                            }}
                        >
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
                                        router.push("root/authen")
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