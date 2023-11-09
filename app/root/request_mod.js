import { Entypo, Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Image, Modal, Pressable, Text, View } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useUser } from "../../src/context/UserContext";

export default () => {
    const { onRequestMod } = useUser()
    const [data, setData] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [type, setType] = useState()
    const [loading, setLoading] = useState(false)
    const selectFront = async () => {
        setType('front')
        setModalVisible(true)
    }
    const selectBack = async () => {
        setType('back')
        setModalVisible(true)
    }
    const launchCam = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 10],
            quality: 1,
        })
        if (!result.canceled) {
            setData({ ...data, [type]: result.assets[0] })
            setModalVisible(false)
        }
    }
    const launchLib = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 10],
            quality: 1,
        })
        if (!result.canceled) {
            setData({ ...data, [type]: result.assets[0] })
            setModalVisible(false)
        }
    }
    const handleVerify = async () => {
        setLoading(true)
        const res = await onRequestMod(data.front, data.back)
        setLoading(false)
        if(res?.success){
            router.back()
        }
    }
    return (
        <View
            style={{ height: '100%', backgroundColor: '#fafeff' }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-between"
                }}
            >
                <Modal
                    visible={modalVisible}
                    transparent
                >
                    <Pressable
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.25)000"
                        }}
                        onPress={() => { setModalVisible(false) }}
                    />
                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: 100,
                            bottom: 0,
                            backgroundColor: "white",
                            shadowColor: "#747474",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,

                            elevation: 24,
                        }}
                    >
                        <Pressable
                            style={{ width: "50%" }}
                            onPress={launchCam}
                        >
                            <Text style={{ fontWeight: "500", textAlign: "center" }}>Use camera</Text>
                        </Pressable>
                        <Pressable
                            style={{ width: "50%" }}
                            onPress={launchLib}
                        >
                            <Text style={{ fontWeight: "500", textAlign: "center" }}>Use library</Text>
                        </Pressable>
                    </View>
                </Modal>
                <View>
                    <View
                        style={{
                            padding: 20
                        }}>
                        <Ionicons name="chevron-back" size={20} color={"#6b6b6b"}
                            onPress={() => { router.back() }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "500",
                                textAlign: "center"
                            }}
                        >Verify your information</Text>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 20
                        }}
                    >
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderColor: "#908a8a",
                                borderRadius: 10,
                                overflow: "hidden",
                                aspectRatio: 1.59
                            }}
                            onPress={selectFront}
                        >
                            {
                                data?.front ?
                                    <Image
                                        source={{
                                            uri: data?.front?.uri
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    /> :
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: '100%'
                                        }}
                                    >
                                        <Text>Select photo is front </Text>
                                        <Entypo name="image" size={72} color="#908a8a" />
                                    </View>
                            }
                        </Pressable>
                        <View style={{ marginTop: 20 }} />
                        <Pressable
                            style={{
                                borderWidth: 1,
                                borderColor: "#908a8a",
                                borderRadius: 10,
                                overflow: "hidden",
                                aspectRatio: 1.59
                            }}
                            onPress={selectBack}
                        >
                            {
                                data?.back ?
                                    <Image
                                        source={{
                                            uri: data?.back?.uri
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    /> :
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: '100%'
                                        }}
                                    >
                                        <Text>Select photo is back</Text>
                                        <Entypo name="image" size={72} color="#908a8a" />
                                    </View>
                            }
                        </Pressable>
                    </View>
                </View>
                <View
                    style={{
                        padding: 20,
                    }}
                >
                    {data?.front && data?.back &&
                        <Pressable
                            style={{
                                borderRadius: 10,
                                backgroundColor: loading ? "#c1c1c1" : "#ff385c",
                                padding: 10
                            }}
                            onPress={handleVerify}
                        >
                            {loading ?
                                <ActivityIndicator size={"small"} color="gray" /> :
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "500",
                                        fontSize: 16,
                                        textAlign: "center"
                                    }}
                                >
                                    Verify
                                </Text>
                            }
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    )
}