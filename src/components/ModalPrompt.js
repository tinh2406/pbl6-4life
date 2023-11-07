import { Ionicons } from "@expo/vector-icons";
import { memo, useEffect } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export default memo(({ title,message,value,onChangeText,visible, onCancel, onConfirm }) => {

    const heightAnim = useSharedValue(0)
    const style = useAnimatedStyle(() => ({
        height: withTiming(heightAnim.value, { duration: 500, easing: Easing.bezier(0.5, 0.01, 0, 1) })
    }))
    useEffect(() => {
        heightAnim.value = visible ? 300 : 200
    }, [visible])
    const onClose = () => {
        heightAnim.value = 0
        setTimeout(onCancel, 10)
    }
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                width: "100%",
                height: "100%",
                justifyContent: "flex-end"
            }}>
                <Pressable
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                    onPress={onClose}
                />
                <Animated.View
                    style={[style]}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 5,
                            alignItems: "center",
                        }}
                    >
                        <View style={{
                            flexDirection: "row",
                            paddingVertical: 5,
                            alignItems: "center",
                            width: "100%"

                        }}>
                            <Ionicons name="close" size={18} color="#212121"
                                onPress={onClose}
                                style={{
                                    padding: 8,
                                    paddingHorizontal: 16
                                }}
                            />
                        </View>


                        <View style={{
                            paddingTop: 10,
                            paddingBottom: 20,
                            width: "90%",

                        }}>
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: "700",
                                    textAlign:"center"
                                }}
                            >{title}</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "500",
                                    textAlign:"center",
                                    marginTop: 10
                                }}
                            >{message}</Text>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingTop: 10,

                            }}>
                                <TextInput
                                    value={value}
                                    onChangeText={onChangeText}
                                    style={{
                                        width: "80%",
                                        paddingVertical: 6,
                                        paddingHorizontal: 20,
                                        borderRadius: 20,
                                        textAlign: "center",
                                        borderWidth:1,
                                        borderColor: "#777777",
                                    }}
                                />
                            </View>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingTop: 40,

                            }}>
                                <Pressable
                                    style={{
                                        width: "70%",
                                    }}
                                    onPress={() => {
                                        
                                        onClose()
                                    }}
                                ><Text
                                    style={{
                                        fontWeight: "600",
                                        paddingVertical: 6,
                                        paddingHorizontal: 10,
                                        borderRadius: 20,
                                        textAlign: "center",
                                    }}
                                >Cancel</Text></Pressable>
                                <Pressable
                                    style={{
                                        width: "70%",
                                    }}
                                    onPress={() => {
                                        onConfirm()
                                        onClose()
                                    }}
                                ><Text
                                    style={{
                                        fontWeight: "700",
                                        paddingVertical: 6,
                                        paddingHorizontal: 10,
                                        borderRadius: 20,
                                        textAlign: "center",
                                        color:"#ff385c"
                                    }}
                                >Confirm</Text></Pressable>

                            </View>
                        </View>
                        <View style={{
                            paddingTop: 10,
                            paddingBottom: 20,
                            width: "100%",
                            alignItems: "center"
                        }}>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
})