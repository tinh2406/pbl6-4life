import { router } from "expo-router";
import {
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import FlatListAutoLoad from "../../../../src/components/FlatListAutoLoad";
import TabBar from "../../../../src/components/TabBar";
import { useUser } from "../../../../src/context/UserContext";
import { useState } from "react";

export default () => {
  const { user } = useUser();
  const width = useWindowDimensions().width;
  const [Keyword,setKeyword] = useState()
  const [timerId,setTimerId] = useState()
  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginTop: 30,
            marginHorizontal: 30,
          }}
        >
          Wishlists
        </Text>
        {user && (
          <TextInput
            placeholder="Look for"
            // value={Keyword}
            onChangeText={(text)=>{
              if (timerId) clearTimeout(timerId);
            setTimerId(
              setTimeout(() => {
                setKeyword(text)
                if(text==='') setKeyword()
              }, 500)
            );
            }}
            style={{
              borderRadius: 6,
              margin: 10,
              padding: 12,
              backgroundColor:"#e8e8e8"
            }}
          />
        )}
        {user ? (
          <>
            <FlatListAutoLoad
              url="/api/favorites"
              params={{...{ PageSize: 5,Keyword }}}
              queryKey={["favorite-posts",Keyword]}
            />
          </>
        ) : (
          <>
            <View
              style={{
                marginHorizontal: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  paddingTop: 40,
                }}
              >
                Login to view wishlists
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 50,
                }}
              >
                <Pressable
                  style={{
                    width: "70%",
                  }}
                  onPress={() => {
                    router.push("root/authen");
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "white",
                      paddingVertical: 14,
                      paddingHorizontal: 20,
                      backgroundColor: "#ff385c",
                      borderRadius: 20,
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
      {width >= 768 || <TabBar currentScreen={"favorite"} />}
    </View>
  );
};
