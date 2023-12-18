import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { memo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import BookingCardMod from "../../../src/components/BookingCardMod";
import { instance } from "../../../src/context/AuthContext";
import Loading from "../../../src/screens/Loading";

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
          Your rooms' bookings
        </Text>
      </View>
      <Content />
    </View>
  );
};

const Content = memo(() => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery(
    ["bookings_of_myrooms"],
    async ({ pageParam }) => {
      const res = await instance.get(`/api/bookings/self-mod`, {
        params: {
          ...{
            PageSize: 5,
            PageIndex: pageParam,
            IsDescending: true,
            SortBy: "CreatedDate",
          },
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

  if (isLoading) return <Loading />;
  return (
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
      data={
        data?.pages.map((page) => page.data.map((booking) => booking)).flat() ||
        []
      }
      renderItem={({ item }) => <BookingCardMod data={item} />}
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
  );
});
