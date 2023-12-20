import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
        contentStyle: {
          width: "100%",
          height: "100%",
          backgroundColor: "#FFF9FA",
        },
        freezeOnBlur: true,
      }}
    ></Tabs>
  );
};
