import { useQueryClient } from "react-query";
import { useNavigation } from "expo-router";
import { memo } from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
export default memo(({ currentScreen }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

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
        name={currentScreen === "favorite" ? "bookmark" : "bookmark-outline"}
        size={30}
        color={currentScreen === "favorite" ? "#FF385C" : "black"}
        style={{
          padding: 5,
        }}
        onPress={() => {
          navigation.navigate("private", { screen: "favorite" });
        }}
      />
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
          navigation.navigate("private", { screen: "notify" });
        }}
      />
      <Ionicons
        name={currentScreen === "profile" ? "ios-person" : "ios-person-outline"}
        size={30}
        color={currentScreen === "profile" ? "#FF385C" : "black"}
        style={{
          padding: 5,
        }}
        onPress={() => {
          navigation.navigate("private", { screen: "myprofile" });
        }}
      />
    </View>
  );
});
