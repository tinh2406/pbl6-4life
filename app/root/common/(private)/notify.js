import { router } from "expo-router";
import { memo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import NotifyItem from "../../../../src/components/NotifyItem";
import TabBar from "../../../../src/components/TabBar";
import { instance } from "../../../../src/context/AuthContext";
import { useUser } from "../../../../src/context/UserContext";

export default () => {
  const { user } = useUser();
  
  return (
    <View style={{ height: "100%", backgroundColor: "#fafeff" }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            paddingTop: 30,
            paddingHorizontal: 30,
            paddingBottom: 10,
            backgroundColor: "#fafeff",
            marginBottom: 5,
          }}
        >
          Notifications
        </Text>
        {user ? (
          <>
            <NotifyContent />
          </>
        ) : (
          <>
            <View
              style={{
                marginHorizontal: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  paddingTop: 40,
                }}
              >
                Login to view notifications
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 50,
                }}
              >
                <Pressable
                  style={{
                    width: "70%",
                  }}
                  onPress={() => {
                    router.push("root/authen");
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "white",
                      paddingVertical: 14,
                      paddingHorizontal: 20,
                      backgroundColor: "#ff385c",
                      borderRadius: 20,
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
      <TabBar currentScreen={"notify"} />
    </View>
  );
};

const NotifyContent = memo(() => {
  const queryClient = useQueryClient();
  const { isFetching, isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["notifys"],
    queryFn: async ({ pageParam }) => {
      try {
        const res = await instance.get("api/notifications", {
          params: {
            PageSize: 15,
            PageIndex: pageParam,
            IsDescending: true,
            SortBy: "CreatedDate",
          },
        });
        return res.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        return undefined;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta.pageIndex + 1;
    },
    keepPreviousData: true,
  });
  const handleEndReached = () => {
    if (isFetching) return;
    if (!data?.pages?.slice(-1)[0]?.data?.length > 0) return;
    fetchNextPage();
  };
  
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        paddingHorizontal: 0,
      }}
      data={data?.pages.map((page) => page?.data.map((noti) => noti)).flat()}
      renderItem={({ item }) => <NotifyItem data={item} />}
      onRefresh={() => {
        if (isLoading || isFetching) return;
        queryClient.resetQueries("notifys");
      }}
      refreshing={isLoading}
      keyExtractor={(item, i) => "_" + item?.id}
      onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
      onEndReachedThreshold={0.9} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
      ListFooterComponent={
        isFetching ? (
          data?.pages?.length > 0 ? (
            <ActivityIndicator size="large" color="#188fff" />
          ) : null
        ) : null
      }
    />
  );
});
