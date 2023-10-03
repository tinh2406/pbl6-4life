import { Text, View } from "react-native"
import TabBar from "../../../../src/components/TabBar"

export default ()=>{
    return(
        <View
            style={{height: '100%'}}
        >
            <View
                style={{
                    flex:1
                }}
            >

            </View>
            <TabBar currentScreen={"profile"}/>
        </View>
    )
}