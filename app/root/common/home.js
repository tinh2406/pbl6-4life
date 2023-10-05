import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import ModalFilter from "../../../src/components/ModalFilter";
import TabBar from "../../../src/components/TabBar";
import WebFilter from "../../../src/components/WebFilter";
import WebHeader from "../../../src/components/WebHeader";
import WhereTo from "../../../src/components/WhereTo";
import FlatListAutoLoad from "../../../src/components/FlatListAutoLoad";
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
                <FlatListAutoLoad
                    paramsLoad={{}}
                />

            </View>

            {width >= 768 ||
                <TabBar currentScreen={"home"} />
            }
        </View>
    )
}