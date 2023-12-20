import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
  const [IsPaid, setIsPaid] = useState();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await instance.get(`/api/bookings/self-user`);
      return res.data;
    },
  });

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={() => setIsPaid()}>
          <Text
            style={[
              styles.statusButton,
              {
                borderBottomColor:
                  IsPaid === undefined ? "#767676" : "transparent",
                fontWeight: IsPaid === undefined ? "500" : "400",
              },
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable onPress={() => setIsPaid(false)}>
          <Text
            style={[
              styles.statusButton,
              {
                borderBottomColor: IsPaid === false ? "#767676" : "transparent",
                fontWeight: IsPaid === false ? "500" : "400",
              },
            ]}
          >
            Pending
          </Text>
        </Pressable>
        <Pressable onPress={() => setIsPaid(true)}>
          <Text
            style={[
              styles.statusButton,
              {
                borderBottomColor: IsPaid === true ? "#767676" : "transparent",
                fontWeight: IsPaid === true ? "500" : "400",
              },
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable>
          <Text
            style={[
              styles.statusButton,
              {
                borderBottomColor:
                  IsPaid === "Ongoing" ? "#767676" : "transparent",
                fontWeight: IsPaid === "Ongoing" ? "500" : "400",
              },
            ]}
          >
            Ongoing
          </Text>
        </Pressable>
        <Pressable>
          <Text
            style={[
              styles.statusButton,
              {
                borderBottomColor:
                  IsPaid === "Review" ? "#767676" : "transparent",
                fontWeight: IsPaid === "Review" ? "500" : "400",
              },
            ]}
          >
            Pending Review
          </Text>
        </Pressable>
      </ScrollView>
      {isLoading ? (
        <View>
          <ActivityIndicator color={"#ff385c"} size={"large"} />
        </View>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            paddingHorizontal: 0,
            backgroundColor: "#dbdbdb",
          }}
          contentContainerStyle={{
            marginTop: 4,
          }}
          data={data}
          renderItem={({ item }) => <BookingCard data={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  statusButton: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    lineHeight: 32,
    marginBottom: 4,
    borderBottomWidth: 1.2,
    marginHorizontal: 6,
    fontSize: 16,
  },
});
