import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
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
import { Swipeable } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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
const stateBooking = [
  "All",
  "Pending",
  "Confirmed",
  "Ongoing",
  "Completed",
  "Request cancel",
  "Canceled",
];
const stateBooking2 = [
  "All",
  "Pending",
  "Confirmed",
  "CheckedIn",
  "Completed",
  "RequestCancel",
  "Canceled",
];
const actionsMapper = {
  "mark-as-paid": "This booking has paid?",
  "reject-booking": "This booking has canceled?",
  "cancel-booking": "This booking has canceled?",
  "confirm-booking": "This booking has confirmed?",
  "refuse-cancel": "Refusing to cancel this booking?",
};
const apisMapper = {
  "mark-as-paid": "api/bookings/mark-as-paid/",
  "reject-booking": "api/bookings/reject-booking/",
  "cancel-booking": "api/bookings/approve-cancel/",
  "confirm-booking": "api/bookings/confirm-booking/",
  "refuse-cancel": "api/bookings/reject-cancel/",
};
const Content = memo(() => {
  const scrollRef = useRef();
  const [status, setStatus] = useState(1);
  const toast = useToast();
  const queryClient = useQueryClient();

  const w = useWindowDimensions().width;
  const [bookingId, setBookingId] = useState();
  const [action, setAction] = useState();
  const left = useSharedValue(-w);
  const style = useAnimatedStyle(() => ({
    left: withTiming(left.value, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    }),
  }));
  useEffect(() => {
    if (scrollRef)
      scrollRef.current.scrollTo({ x: status * status * 10, animated: true });
    left.value = -w * status;
  }, [status]);
  const [AllData, setAllData] = useState();

  useEffect(() => {
    setAllData(
      stateBooking2.map((state) => (
        <MyFlatList
          key={state}
          status={state}
          setAction={setAction}
          setBookingId={setBookingId}
        />
      ))
    );
  }, []);
  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {stateBooking.map((state, i) => (
          <Pressable key={i} onPress={() => setStatus(i)}>
            <Text
              style={[
                styles.statusButton,
                {
                  borderBottomColor: status === i ? "#767676" : "transparent",
                  fontWeight: status === i ? "500" : "400",
                },
              ]}
            >
              {state}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Swipeable
        onSwipeableWillClose={(e) => {
          if (e === "right") {
            if (status < stateBooking.length - 1) setStatus(status + 1);
          }
          if (e === "left") {
            if (status > 0) setStatus(status - 1);
          }
        }}
      >
        {AllData ? (
          <Animated.View style={[{ flexDirection: "row",width:stateBooking2.length*w }, style]}>
            {AllData}
          </Animated.View>
        ) : (
          <View style={{ width: w }}>
            <ActivityIndicator color={"#ff385c"} size={"large"} />
          </View>
        )}
      </Swipeable>

      <ModalPrompt
        title="Comfirm"
        message={actionsMapper[action] || "This booking has paid?"}
        visible={!!action}
        onCancel={() => setAction()}
        onConfirm={async () => {
          if (bookingId) {
            if (action) {
              try {
                await instance.post(`${apisMapper[action]}${bookingId}`);
                queryClient.invalidateQueries("bookings_of_myrooms");
              } catch (error) {
                console.log(error.response);
                toast.show(`Error: ${error.message}`, {
                  type: "danger",
                  placement: "top",
                });
              }
            }
          }
        }}
      />
    </View>
  );
});

const MyFlatList = memo(({ status, setAction, setBookingId }) => {
  const h = useWindowDimensions().height;
  const w = useWindowDimensions().width;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(
    ["bookings_of_myrooms", status],
    async ({ pageParam }) => {
      const res = await instance.get(`/api/bookings/self-mod`, {
        params: {
          PageSize: 5,
          PageIndex: pageParam,
          IsDescending: true,
          SortBy: "CreatedDate",
          ...(status === "All" ? {} : { Types: status }),
          // ...(IsPaid !== undefined ? { IsPaid } : {}),
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

  return (
    <View style={{ width: w }}>
      {isLoading ? (
        <View style={{ width: w }}>
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
            queryClient.resetQueries(["bookings_of_myrooms", status]);
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
