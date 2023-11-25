import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo } from "react";
import {
    FlatList,
    Text,
    View
} from "react-native";
import { useQuery } from "react-query";
import BookingCard from "../../../src/components/BookingCard";
import { instance } from "../../../src/context/AuthContext";

export default () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fcfcfc",
      }}
    >
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={"#6b6b6b"}
          onPress={() => {
            router.back();
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            flexGrow: 1,
            marginLeft: 20,
          }}
        >
          Your trips
        </Text>
      </View>
      <Content />
    </View>
  );
};

const Content = memo(() => {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await instance.get(`/api/bookings/self-user`);
      return res.data;
    },
  });
  
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        paddingHorizontal: 0,
        backgroundColor: "#dbdbdb"
      }}
      contentContainerStyle={{
        marginTop:4
      }}
      data={data}
      renderItem={({ item }) => <BookingCard data={item} />}
      keyExtractor={(item) => item.id}
    />
  );
});
