import { ActivityIndicator, useWindowDimensions } from "react-native";
import { FlatList } from "react-native";
import RoomCard from "./RoomCard";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { instance } from "../context/AuthContext";
import { memo } from "react";
import RoomCardSkeleton from "./Skeleton/RoomCardSkeleton";
export default memo(({ url,queryKey, params,headercomponent }) => {
  const queryClient = useQueryClient();

  const { isFetching,isLoading, data, fetchNextPage } = useInfiniteQuery({
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
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        paddingHorizontal: 0,
      }}
      data={data?.pages.map((page) => page.data.map((post) => post)).flat()}
      renderItem={({ item }) => <RoomCard data={item} />}

      numColumns={1}
      onRefresh={()=>{
          if (isLoading||isFetching) return;
          queryClient.resetQueries(queryKey);
      }}
      refreshing={isLoading}
      keyExtractor={(item, i) => "_" + item.id}
      onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
      onEndReachedThreshold={0.9} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
      ListFooterComponent={
        isFetching ? (data?.pages?.length>0 ? <ActivityIndicator size="large" color="#188fff" /> : <RoomCardSkeleton/>) : null
      }
    />
  );
})