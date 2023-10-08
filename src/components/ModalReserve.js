import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAuth } from "../context/AuthContext";
import { DatePickerModal } from "react-native-paper-dates";
import { format } from "date-fns";


export default ({ visible, hidden, onConfirm }) => {
    const { user } = useAuth()
    const [pickShow,setPickShow]=useState(false)
    const [timeCheckIn,setTimeCheckIn]=useState()
    const [timeCheckOut,setTimeCheckOut]=useState()
    const heightAnim = useSharedValue(0)
    const style = useAnimatedStyle(() => ({
        height: withTiming(heightAnim.value, { duration: 500, easing: Easing.bezier(0.5, 0.01, 0, 1) })
    }))
    useEffect(() => {
        heightAnim.value = visible ? user ? 360 : 510 : 200
    }, [visible, user])
    const onClose = () => {
        heightAnim.value = 0
        setTimeout(hidden, 10)
    }
    const onConfirmTime = ({startDate,endDate}) => {
        setTimeCheckIn(startDate)
        setTimeCheckOut(endDate)
        setPickShow(false)
    }
    const tomorrow = useMemo(()=>{
        const today = new Date()
        const tomorrowDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)
        return tomorrowDate
    },[])
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
                <DatePickerModal
                    locale="en"
                    mode="range"
                    visible={pickShow}
                    onDismiss={()=>{setPickShow(false)}}
                    startDate={timeCheckIn||new Date()}
                    endDate={timeCheckOut||tomorrow}
                    onConfirm={onConfirmTime}
                />
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
                    <ScrollView

                        contentContainerStyle={{
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
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "500"
                            }}>
                                $41/night
                            </Text>
                            <View style={{
                                marginTop: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#c6c6c6"
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Pressable style={{
                                        borderRightWidth: 1,
                                        borderBottomWidth: 1,
                                        borderColor: "#c6c6c6",
                                        width: 140,
                                        padding: 6
                                    }}
                                        onPress={()=>setPickShow(true)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "500"
                                            }}
                                        >Check in</Text>
                                        <Text>{timeCheckIn?format(timeCheckIn, 'dd/MM/yyyy'):"Select date"}</Text>
                                    </Pressable>
                                    <Pressable style={{
                                        width: 140,
                                        padding: 6,
                                        borderBottomWidth: 1,
                                        borderColor: "#c6c6c6",
                                        }}
                                        onPress={()=>setPickShow(true)}

                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "500"
                                            }}>Check out</Text>
                                        <Text>{timeCheckOut?format(timeCheckOut, 'dd/MM/yyyy'):"Select date"}</Text>
                                    </Pressable>
                                </View>
                                <Pressable style={{
                                    padding: 6

                                }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "500"
                                        }}
                                    >Guests</Text>
                                    <Text>1</Text>
                                </Pressable>
                            </View>

                            <View style={{
                                marginTop: 20,
                                flexDirection: "row",
                                justifyContent: "space-between",

                            }}>
                                <Text style={{}}>
                                    $43x5
                                </Text>
                                <Text style={{}}>215</Text>
                            </View>
                            <View style={{
                                marginTop: 6,
                                flexDirection: "row",
                                justifyContent: "space-between",

                            }}>
                                <Text style={{}}>
                                    Fee
                                </Text>
                                <Text style={{}}>15</Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                paddingTop: 10,
                                borderTopWidth: 1,
                                borderColor: "#c6c6c6",
                                justifyContent: "space-between",
                                flexDirection: "row",

                            }}>
                                <Text style={{
                                    fontWeight: "500"
                                }}>
                                    Total
                                </Text>
                                <Text style={{}}>230</Text>
                            </View>
                        </View>
                        {user ?
                            <Pressable style={{
                                backgroundColor: "#ff385c",
                                borderRadius: 10,
                                padding: 8,
                                width: 280,
                                marginTop: 20,
                            }}>
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontWeight: "500"
                                    }}
                                >Booking</Text>
                            </Pressable>
                            :
                            <View style={{
                                paddingTop: 10,
                                paddingBottom: 20,
                                width: "80%",
                                marginTop: 20

                            }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "600",
                                    }}
                                >Login or sign up to book</Text>
                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    paddingTop: 20,

                                }}>
                                    <Pressable
                                        style={{
                                            width: "70%",
                                        }}
                                        onPress={() => {
                                            router.push("root/authen/login")
                                            hidden()
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
                                    paddingTop: 10,

                                }}>
                                    <Pressable
                                        style={{
                                            width: "70%",
                                        }}
                                        onPress={() => {
                                            hidden()
                                            router.push("root/authen/register")
                                        }}
                                    ><Text
                                        style={{
                                            fontWeight: "600",
                                            paddingVertical: 14,
                                            paddingHorizontal: 20,
                                            borderRadius: 20,
                                            textAlign: "center",
                                            borderWidth: 1,
                                            borderColor: "#ff385c",
                                            color: "#ff385c"
                                        }}
                                    >Sign up</Text></Pressable>

                                </View>
                            </View>
                        }
                        <View style={{
                            paddingTop: 10,
                            paddingBottom: 20,
                            width: "100%",
                            alignItems: "center"
                        }}>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    )
}