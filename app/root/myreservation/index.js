import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import BookingCardMod from "../../../src/components/BookingCardMod";
import { instance } from "../../../src/context/AuthContext";
import ModalPrompt from "../../../src/components/ModalPrompt";
import { useToast } from "react-native-toast-notifications";

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
          Your reservations
        </Text>
      </View>
      <Content />
    </View>
  );
};

const Content = memo(() => {
  const [IsPaid, setIsPaid] = useState();
  const toast = useToast()
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(
    ["bookings_of_myrooms", IsPaid],
    async ({ pageParam }) => {
      const res = await instance.get(`/api/bookings/self-mod`, {
        params: {
          PageSize: 5,
          PageIndex: pageParam,
          IsDescending: true,
          SortBy: "CreatedDate",
          ...(IsPaid !== undefined ? { IsPaid } : {}),
        },
      });
      return res.data;
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.meta.pageIndex + 1;
      },
    }
  );
  const handleEndReached = () => {
    if (isFetching) return;
    if (!data?.pages?.slice(-1)[0].data?.length > 0) return;
    fetchNextPage();
  };
  const h = useWindowDimensions().height;
  const [bookingId, setBookingId] = useState();
  const [action, setAction] = useState();
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
            height: h - 146,
            paddingHorizontal: 0,
            backgroundColor: "#dbdbdb",
          }}
          contentContainerStyle={{
            marginTop: 4,
          }}
          data={
            data?.pages
              .map((page) => page.data.map((booking) => booking))
              .flat() || []
          }
          renderItem={({ item }) => (
            <BookingCardMod
              data={item}
              setAction={setAction}
              setBookingId={setBookingId}
            />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={() => {
            if (isFetching) return;
            queryClient.resetQueries("bookings_of_myrooms");
          }}
          refreshing={isLoading}
          onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
          onEndReachedThreshold={0.7} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
          ListFooterComponent={
            isFetching && data?.pages?.length > 0 ? (
              <ActivityIndicator size="large" color="#919191" />
            ) : null
          }
        />
      )}
      <ModalPrompt
        title="Comfirm"
        message="This booking has paid?"
        visible={!!action}
        onCancel={() => setAction()}
        onConfirm={async () => {
          if (bookingId) {
            if (action === "mark-as-paid") {
              try {
                await instance.post(`api/bookings/mark-as-paid/${bookingId}`);
                queryClient.invalidateQueries("bookings_of_myrooms");
              } catch (error) {
                console.log(error.response);
                toast.show(`Error: ${error.message}`,{
                  type:"danger",
                  placement:"top",
                });
              }
            }
          }
        }}
      />
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
