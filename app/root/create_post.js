import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { Text, TextInput, View } from "react-native"

export default () => {
    return (
        <View
            style={{ height: '100%', backgroundColor: '#fafeff' }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        padding: 20,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Ionicons name="chevron-back" size={20} color={"#6b6b6b"}
                        onPress={() => { router.back() }}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "500",
                            textAlign: "center",
                            flexGrow: 1
                        }}
                    >Create your accomodation</Text>
                </View>
                <View
                >
                    <View>
                        <Text>Name</Text>
                        <TextInput
                        />
                        
                    </View>
                    <View>
                        <Text>Decribe</Text>
                        <TextInput
                        />
                        
                    </View>
                </View>
                
            </View>
        </View>
    )
}