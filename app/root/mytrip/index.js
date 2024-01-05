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
  Image,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import BookingCard from "../../../src/components/BookingCard";
import { instance } from "../../../src/context/AuthContext";
import { Swipeable } from "react-native-gesture-handler";
import ModalPayment from "../../../src/components/ModalPayment";
import ModalPrompt from "../../../src/components/ModalPrompt";
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
          Your trips
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
  "Wait for cancel",
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
const apisMapper = {
  "remove-cancel": "api/bookings/revoke-cancel-booking-request",
  "cancel-booking": "api/bookings/request-cancel",
};
const messagesMapper = {
  "remove-cancel": "Remove this request?",
  "cancel-booking": "Do you want cancel this booking?",
};

const Content = memo(() => {
  const w = useWindowDimensions().width;
  const scrollRef = useRef();
  const [status, setStatus] = useState(1);
  const queryClient = useQueryClient();
  const [paymentData, setPaymentData] = useState();
  const [bookingId, setBookingId] = useState();
  const [action, setAction] = useState();
  const left = useSharedValue(-w);
  const [AllData, setAllData] = useState();
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

  useEffect(() => {
    setAllData(
      stateBooking2.map((state) => (
        <MyFlatList
          key={state}
          status={state}
          setAction={setAction}
          setBookingId={setBookingId}
          setPaymentData={setPaymentData}
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
          <Animated.View
            style={[
              { flexDirection: "row", width: stateBooking2.length * w },
              style,
            ]}
          >
            {AllData}
          </Animated.View>
        ) : (
          <View style={{ width: w }}>
            <ActivityIndicator color={"#ff385c"} size={"large"} />
          </View>
        )}
      </Swipeable>

      <ModalPayment
        data={paymentData}
        visible={!!paymentData}
        onConfirm={() => {}}
        hidden={() => {
          setPaymentData();
        }}
      />
      <ModalPrompt
        title="Comfirm"
        message={messagesMapper[action]}
        visible={!!bookingId}
        onCancel={() => setBookingId()}
        onConfirm={async () => {
          if (bookingId && action) {
            try {
              await instance.post(`${apisMapper[action]}/${bookingId}`);
              queryClient.invalidateQueries(["bookings"]);
            } catch (error) {
              console.log(error.response);
              toast.show(`Error: ${error.message}`, {
                type: "danger",
                placement: "top",
              });
            }
          }
        }}
      />
    </View>
  );
});

const MyFlatList = memo(
  ({ status, setAction, setPaymentData, setBookingId }) => {
    const h = useWindowDimensions().height;
    const w = useWindowDimensions().width;
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(
      ["bookings", status],
      async ({ pageParam }) => {
        const res = await instance.get(`/api/bookings/self-user`, {
          params: {
            PageSize: 5,
            PageIndex: pageParam,
            IsDescending: true,
            SortBy: "CreatedDate",
            ...(status === "All" ? {} : { Types: status }),
            // ...(status !== undefined ? { IsPaid } : {}),
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
        {!isLoading && !data.pages[0].data?.length > 0 && (
          <View
            style={{
              width: w,
              backgroundColor: "white",
            }}
          >
            <Image
              source={{
                uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/411141799_391849876572650_1462271918597209384_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=510075&_nc_eui2=AeEZc31FhuQ7ZhKvNZ3TLssUF1ZSJ76_jb4XVlInvr-Nvp8Po9HyMEU7O50BGPruQbbqqiwAM3vYD0EMqfo1XxZP&_nc_ohc=_S9LBXqU8cIAX9XoXjt&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRvSWVsUzZZJkL-Z-ywcFyaMF9NsfijZygow26IC8plWA&oe=65BE44AB",
              }}
              width={200}
              height={200}
              style={{
                margin: (w - 200) / 2,
              }}
            />
          </View>
        )}

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
              width: w,
              height: h - 146,
              paddingHorizontal: 0,
              backgroundColor: "#dbdbdb",
            }}
            contentContainerStyle={{
              marginTop: 4,
              width: w,
            }}
            data={
              data?.pages
                .map((page) => page.data.map((booking) => booking))
                .flat() || []
            }
            renderItem={({ item }) => (
              <BookingCard
                data={item}
                setPaymentData={setPaymentData}
                setBookingId={setBookingId}
                setAction={setAction}
              />
            )}
            keyExtractor={(item) => item.id}
            onRefresh={() => {
              if (isFetching) return;
              queryClient.resetQueries(["bookings", status]);
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
  }
);

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
