import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export default ({ visible, hidden, onConfirm }) => {

    const heightAnim = useSharedValue(0)
    const style = useAnimatedStyle(() => ({
        height: withTiming(heightAnim.value, { duration: 500, easing: Easing.bezier(0.5, 0.01, 0, 1) })
    }))
    useEffect(() => {
        heightAnim.value = visible ? 370 : 200
    }, [visible])
    const onClose = () => {
        heightAnim.value = 0
        setTimeout(hidden, 10)
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
                            >Login to view detail</Text>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                paddingTop: 100,

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
                                >Go to login</Text></Pressable>

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
                                        paddingVertical: 14,
                                        paddingHorizontal: 20,
                                        borderRadius: 20,
                                        textAlign: "center",
                                        borderWidth:1,
                                        borderColor: "#777777",
                                    }}
                                >Cancel</Text></Pressable>

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
}