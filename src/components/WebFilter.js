import { Pressable, Text, View } from "react-native"

export default ()=>{
    return(
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#FFFCFC",
                }}
        >
            <View style={{}}>
                <Text style={{}}>
                    Location
                </Text>
                <Pressable>
                    <Text style={{}}>Da Nang</Text>
                </Pressable>
            </View>
            <View style={{}}>
                <Text style={{}}>
                    Type
                </Text>
                <Pressable>
                    <Text style={{}}>Hotel</Text>
                </Pressable>
            </View>
            <View style={{}}>
                <Text style={{}}>
                    Check-in
                </Text>
                <Pressable>
                    <Text style={{}}>20/11/2023</Text>
                </Pressable>
            </View>
            <View style={{}}>
                <Text style={{}}>
                Check-out
                </Text>
                <Pressable>
                    <Text style={{}}>20/11/2023</Text>
                </Pressable>
            </View>
            <View style={{}}>
                <Text style={{}}>
                    Guest
                </Text>
                <Pressable>
                    <Text style={{}}>5</Text>
                </Pressable>
            </View>
        </View>
    )
}