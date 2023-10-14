import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { router, useGlobalSearchParams } from "expo-router"
import { View, Text, Pressable, Image } from "react-native"
import { useUser } from "../../../src/context/UserContext"
import { useEffect, useState } from "react"
import { instance } from "../../../src/context/AuthContext"
import * as ImagePicker from 'expo-image-picker';

export default () => {
    const [image, setImage] = useState(null);
    const { userId } = useGlobalSearchParams()
    const { user: own } = useUser()
    const [user, setUser] = useState()
    const getUserWithId = async (userId) => {
        try {
            const res = instance.get(`/api/users/${userId}`)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const handleUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        delete result.cancelled;
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
    console.log(image);
    useEffect(() => {
        if (userId !== own.id)
            getUserWithId(userId)
        else setUser(own)
    }, [userId, own]);
    return (
        <View
            style={{ height: '100%', backgroundColor: '#fafeff' }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                <Ionicons name="chevron-back" size={20} color={"#6b6b6b"}
                    onPress={() => { router.back() }}
                    style={{
                        padding: 20
                    }}
                />

                <View
                    style={{
                        marginHorizontal: 20,
                        marginTop: 20,
                        backgroundColor: '#ffffff',
                        shadowColor: "#747474",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,

                        elevation: 24,
                        borderRadius: 20,
                    }}
                >
                    <View
                        style={{
                            alignItems: "center"
                        }}
                    >
                        <Pressable
                            style={{
                                borderRadius: 100,
                                margin: 20
                            }}
                            disabled={userId !== own?.id}
                            onPress={handleUploadImage}
                        >
                            <Image
                                source={{ uri: image || user?.avatar || 'https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/tinh.jpg?alt=media&token=36e93d04-5110-493d-9940-bda39bbe8b8b&_gl=1*1bc07mb*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjI2MDc2OS40LjEuMTY5NjI2MDgwMC4yOS4wLjA.' }}
                                style={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: 100,
                                }}
                            />
                        </Pressable>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "700"
                        }}>
                            {user?.name}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: "500",
                            marginBottom: 10
                        }}>
                            Guest
                        </Text>

                    </View>
                </View>
            </View>
        </View>
    )
}