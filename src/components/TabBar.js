import { useQueryClient } from "react-query";
import { useNavigation } from "expo-router";
import { memo } from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNotify } from "../context/NotifyContext";
export default memo(({ currentScreen }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { hasNew, setHasNew, newNoti,updateLast } = useNotify();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        height: 50,
        bottom: 0,
      }}
    >
      <Ionicons
        name={currentScreen === "home" ? "md-home" : "home-outline"}
        size={30}
        color={currentScreen === "home" ? "#FF385C" : "black"}
        style={{
          padding: 5,
        }}
        onPress={() => {
          if (currentScreen == "home") {
            queryClient.resetQueries("posts");
            return;
          }
          navigation.navigate("home");
        }}
      />
      <Ionicons
        name={currentScreen === "favorite" ? "heart" : "heart-outline"}
        size={30}
        color={currentScreen === "favorite" ? "#FF385C" : "black"}
        style={{
          padding: 5,
        }}
        onPress={() => {
          navigation.navigate("(private)", { screen: "favorite" });
        }}
      />
      <View>
        <Ionicons
          name={
            currentScreen === "notify"
              ? "notifications-sharp"
              : "notifications-outline"
          }
          size={30}
          color={currentScreen === "notify" ? "#FF385C" : "black"}
          style={{
            padding: 5,
          }}
          onPress={() => {
            navigation.navigate("(private)", { screen: "notify" });
            // updateLast()
            setTimeout(() => setHasNew(false), 2000);
          }}
        />
        {hasNew && (
          <Text
            style={{
              position: "absolute",
              top: 0,
              right: 2,
              paddingHorizontal: 5,
              paddingVertical: 1.2,
              fontWeight: "600",
              color: "white",
              fontSize: 10,
              borderRadius: 10,
              backgroundColor: "#ff2828",
            }}
          >
            {newNoti.size}
          </Text>
        )}
      </View>

      <Ionicons
        name={currentScreen === "profile" ? "ios-person" : "ios-person-outline"}
        size={30}
        color={currentScreen === "profile" ? "#FF385C" : "black"}
        style={{
          padding: 5,
        }}
        onPress={() => {
          navigation.navigate("(private)", { screen: "setting" });
        }}
      />
    </View>
  );
});
