import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import {Name,Phone,Address,DateOfBirth,Gender} from "../../../../../src/components/EditPersonalInfo"
import { useUser } from "../../../../../src/context/UserContext"
export default () => {

    const {user} = useUser()

    return (
        <View
            style={{ height: '100%', backgroundColor: '#fafeff' }}
        >
            <ScrollView
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

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "700",
                        marginHorizontal: 20
                    }}
                >Personal Info</Text>
                <View
                    style={{
                        marginHorizontal: 20,
                        marginTop: 20,
                    }}
                >
                    <Name name={user?.name}/>
                    <Phone phone={user?.phoneNumber}/>
                    <Address address={user?.address}/>
                    <DateOfBirth dateOfBirth={user?.dateOfBirth==="0001-01-01"?null:new Date(user?.dateOfBirth)}/>
                    <Gender gender={user?.gender}/>
                </View>
            </ScrollView>
        </View>
    )
}