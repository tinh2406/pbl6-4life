import { EvilIcons, Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native"

export default ({ value, setValue }) => {
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState("")
    const [result, setResult] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const onClose = () => {
        if(Number(text)){
            setValue(Number(text))
        }
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
                            width: 160,
                            height: 300,
                            top,
                            left: left - 180,
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
                        <TextInput
                            value={text}
                            onChangeText={(text) => setText(text)}
                            style={{
                                borderWidth: 1,
                                borderColor: "#9c9c9c",
                                padding: 6,
                                paddingHorizontal: 12,
                                margin: 10,
                                borderRadius: 20,
                                fontSize: 16,
                            }}
                            placeholder="Enter a number"
                        />
                        {
                            text!=="" &&
                            <Ionicons name="close" size={20}
                                style={{
                                    position: "absolute",
                                    right: 15,
                                    top: 12,
                                    padding: 5,
                                    borderRadius: 20,
                                    
                                }}
                                onPress={()=>{setText("")}}
                            />
                        }

                        <ScrollView style={{
                            padding: 10,
                            paddingHorizontal: 12,
                            borderTopWidth: 1,
                            borderColor: "#9c9c9c",
                        }}
                        >
                            {result.map(i =>
                                <Pressable
                                    key={i}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 10
                                    }}
                                    onPress={() => {
                                        onSelect(i)
                                    }}
                                >
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
                Guests
            </Text>
            <Pressable
                style={{
                    backgroundColor: "#ff8787",
                    padding: 8,
                    paddingHorizontal: 12,
                    borderRadius: 40,
                    minWidth: 120,
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
                <Ionicons name="ios-people-outline" size={20} color="white" />
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    marginLeft: 4
                }}>{value || "Any"}</Text>
                {value &&
                    <EvilIcons
                        onPress={() => {setValue();setText("");}}
                        style={{ position: "absolute", right: 10 }}
                        name="close" size={20} color="white" />}
            </Pressable>

        </View>
    )
}