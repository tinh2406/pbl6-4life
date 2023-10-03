import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import RoomCard from "../../../src/components/RoomCard";
import TabBar from "../../../src/components/TabBar";
import ModalFilter from "../../../src/components/ModalFilter";
import { useState } from "react";
import WhereTo from "../../../src/components/WhereTo";
import WebHeader from "../../../src/components/WebHeader";
import WebFilter from "../../../src/components/WebFilter";

export default () => {
    const width = useWindowDimensions().width
    const [filterShow, setFilterShow] = useState(false);
    const [filterState, setFilterState] = useState();

    const [searchShow, setSearchShow] = useState(false);
    const [searchState, setSearchState] = useState();
    console.log(filterState, searchState);

    return (
        <View
            style={{ height: '100%' }}
        >
            <View
                style={{
                    flex: 1,
                }}
            >
                <View

                >
                    {width >= 768 ?
                        <View style={{}}>
                            <WebHeader />
                            <WebFilter />
                        </View>
                        :
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 10,
                            backgroundColor: "#ffffff",
                        }}>
                            <ModalFilter
                                visible={filterShow}
                                hidden={() => setFilterShow(false)}
                                onConfirm={setFilterState}
                            />
                            <Pressable
                                style={{
                                    flex: 1,
                                    overflow: "hidden",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.27,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderRadius: searchShow ? 8 : 50
                                }}
                                onPress={() => setSearchShow(true)}
                            >
                                <WhereTo expand={searchShow}
                                    onClose={() => setSearchShow(false)}
                                    onConfirm={setSearchState}
                                />
                            </Pressable>
                            {searchShow ||
                                <MaterialIcons name="tune" size={20} color="black"
                                    style={{
                                        borderRadius: 50,
                                        borderWidth: 1,
                                        borderColor: "rgba(0, 0, 0, 0.3)",
                                        padding: 6,
                                        textAlign: "center",
                                        textAlignVertical: "center",
                                        marginLeft: 10
                                    }}
                                    onPress={() => setFilterShow(true)}
                                />}
                        </View>
                    }

                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: "100%",
                        paddingHorizontal: width >= 768 ? 20 : 0
                    }}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={({ item }) => (
                        <RoomCard />
                    )}
                    //Setting the number of column
                    numColumns={width >= 768 ? 5 : 1}
                    keyExtractor={(item, index) => index}
                />
            </View>
            {width >= 768 ||
                <TabBar currentScreen={"home"} />
            }
        </View>
    )
}