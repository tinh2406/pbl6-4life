import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Image, Pressable, Text, View } from "react-native"

export default () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                height: 70,
                backgroundColor: "white",
            }}
        >
            <View
                style={{
                    flexDirection:"row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 50
                }}
            >
                <MaterialCommunityIcons name="home-roof" size={40} color="#FF385C" />
                <Text
                    style={{
                        fontSize: 24,
                        color: '#FF385C'
                    }}
                >4LIFE</Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width:"30%",
                    justifyContent: "space-evenly",
                }}
            >
                <Pressable>
                    <Text>
                        Home
                    </Text>
                </Pressable>
                <Pressable>
                    <Text>
                        About
                    </Text>
                </Pressable>
            </View>
            <View>
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/tinh.jpg?alt=media&token=36e93d04-5110-493d-9940-bda39bbe8b8b&_gl=1*1bc07mb*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjI2MDc2OS40LjEuMTY5NjI2MDgwMC4yOS4wLjA.' }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                        }}
                    />
                    <Text>User</Text>
                </Pressable>
            </View>
        </View>
    )
}