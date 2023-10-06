import { EvilIcons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native"

export default ({ value, setValue }) => {
    const [visible, setVisible] = useState(false)
    const [result, setResult] = useState(["Hotel", "Homestay", "Room"])
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const onClose = () => {
        setVisible(false)
    }
    const onSelect = (i) => {
        setValue(i)
        setVisible(false)
    }
    return (
        <View style={{}}>
            <Modal
                visible={visible}
                transparent
            // animationType="fade"
            >
                <View style={{
                    width: "100%",
                    height: "100%",
                }}>
                    <Pressable
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                        }}
                        onPress={onClose}
                    />
                    <View
                        style={{
                            width: 300,
                            height: 400,
                            top,
                            left,
                            backgroundColor: "white",
                            borderRadius: 20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                    >
                        <ScrollView style={{
                            padding: 10,
                            paddingHorizontal: 12,
                        }}
                        >
                            {result.map(i =>
                                <Pressable
                                    key={i}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom:10

                                    }}
                                    onPress={() => {
                                        onSelect(i)
                                    }}
                                >
                                    <EvilIcons name="location" size={20} color="#5c5c5c" style={{
                                        padding: 6,
                                        borderRadius: 10,
                                        backgroundColor: "#cecece",
                                        marginRight: 10
                                    }} />
                                    <Text style={{
                                        color: "#5c5c5c",
                                        fontWeight: "bold",
                                        marginLeft: 1
                                    }}>{i}</Text>
                                </Pressable>)}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            <Text style={{
                fontWeight: "bold",
                color: "#ff385c"
            }}>
                Type
            </Text>
            <Pressable
                style={{
                    backgroundColor: "#ff8787",
                    padding: 8,
                    paddingHorizontal: 12,
                    borderRadius: 40,
                    minWidth: 140,
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center"
                }}
                onPress={(e) => {
                    setVisible(true)
                    setLeft(e.clientX)
                    setTop(e.clientY)
                }}
            >
                <EvilIcons name="location" size={20} color="white" />
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    marginLeft: 1
                }}>{value||"Any"}</Text>
                {value &&
                    <EvilIcons
                        onPress={() => setValue()}
                        style={{ position: "absolute", right: 10 }}
                        name="close" size={20} color="white" />}
            </Pressable>
        </View>
    )
}