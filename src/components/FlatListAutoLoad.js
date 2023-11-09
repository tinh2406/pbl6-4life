import { ActivityIndicator, useWindowDimensions } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import RoomCard from "./RoomCard";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { instance } from "../context/AuthContext";
import { memo } from "react";
export default memo(({ url,queryKey, params,headercomponent }) => {
  const queryClient = useQueryClient();

  const width = useWindowDimensions().width;
  const { isFetching, data, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const res = await instance.get(url, {
        params: { ...params, PageIndex: pageParam },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.pageIndex + 1;
    },
  });
  const handleEndReached = () => {
    if(isFetching) return;
    if(! data?.pages?.slice(-1)[0].data?.length>0) return
    fetchNextPage();
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      bounces={false}
      ListHeaderComponent={headercomponent}
      // alwaysBounceHorizontal={false}
      // alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        paddingHorizontal: width >= 600 ? 20 : 0,
      }}
      data={data?.pages.map((page) => page.data.map((post) => post)).flat()}
      renderItem={({ item }) => <RoomCard data={item} />}
      //Setting the number of column
      numColumns={1}
      onRefresh={()=>{
          if (isFetching) return;
          queryClient.resetQueries(queryKey);
      }}
      refreshing={isFetching}
      keyExtractor={(item, i) => "_" + item.id}
      onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
      onEndReachedThreshold={0.7} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
      ListFooterComponent={
        isFetching ? <ActivityIndicator size="large" color="#188fff" /> : null
      }
    />
  );
})