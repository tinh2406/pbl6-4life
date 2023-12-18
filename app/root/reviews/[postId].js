import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import ReviewSkeleton from "../../../src/components/Skeleton/ReviewSkeleton";
import { useInfiniteQuery } from "react-query";
import { instance } from "../../../src/context/AuthContext";
import { memo } from "react";
import defaultAvt from "../../../src/assets/defaultAvatar.png";

export default () => {
  const { postId } = useLocalSearchParams();

  const { isFetching, isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["reviews", postId],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await instance.get(`api/reviews/${postId}`, {
          params: { PageSize: 10, PageIndex: pageParam },
        });
        return res.data;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.pageIndex + 1;
    },
  });
  const handleEndReached = () => {
    if (isFetching) return;
    if (!data?.pages?.slice(-1)[0].data?.length > 0) return;
    fetchNextPage();
  };

  return (
    <View style={{ height: "100%", backgroundColor: "#fafeff" }}>
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
            marginLeft: 10,
            fontWeight: "500",
            textAlign: "left",
            flexGrow: 1,
          }}
        >
          Reviews
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          paddingHorizontal: 0,
        }}
        data={data?.pages?.map((page) => page.data.map((post) => post)).flat()}
        renderItem={({ item }) => <ReviewItem data={item} />}
        onRefresh={() => {
          if (isLoading || isFetching) return;
          queryClient.resetQueries(queryKey);
        }}
        refreshing={isLoading}
        keyExtractor={(item, i) => Math.random() + item.userId}
        onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
        onEndReachedThreshold={0.9} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
        ListFooterComponent={
          isFetching ? (
            data?.pages?.length > 0 ? (
              <ActivityIndicator size="large" color="#188fff" />
            ) : (
              <ReviewSkeleton />
            )
          ) : null
        }
      />
    </View>
  );
};

const ReviewItem = memo(({ data }) => {
  return (
    <View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          paddingTop: 10,
          borderTopWidth: 1,
          borderColor: "#dbdbdb",
        }}
      >
        <Image
          source={
            data?.user.avatar
              ? {
                  uri: data?.user.avatar,
                  cache: "force-cache",
                }
              : defaultAvt
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            marginRight: 20,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 10,
              fontWeight: "500",
            }}
          >
            {data?.user.name}
          </Text>
          <RateItem title="Cleanliness" rate={data?.cleanlinessRating} />
          <RateItem title="Location" rate={data?.locationRating} />
          <RateItem title="Comfortable" rate={data?.comfortRating} />
          <RateItem title="Amenity" rate={data?.amenitiesRating} />
        </View>
      </View>
      <Text
        style={{
          marginLeft: 40,
          marginRight: 5,
          marginTop: 10,
        }}
      >
        {data?.comment}
      </Text>
    </View>
  );
});

const RateItem = memo(({ title, rate }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 12,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Ionicons
            key={i}
            name={rate >= i ? "star" : "star-outline"}
            size={14}
            style={{
              marginRight: 5,
              padding: 4,
              color: rate >= i ? "#FFD233" : "#c1c1c1",
            }}
          />
        ))}
      </View>
    </View>
  );
});
