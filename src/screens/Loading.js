import { ActivityIndicator, Text, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default ()=>{
    return(
        <View
            style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position:"absolute",
                zIndex:1,
                backgroundColor:"white"
            }}
        >
            <MaterialCommunityIcons name="home-roof" size={72} color="#FF385C" />
            <Text
                style={{
                    fontSize:24,
                    color: '#FF385C'
                }}
            >4LIFE</Text>
            <ActivityIndicator
                size="large"
                color="#ff385c"
            />
        </View>
    )
}