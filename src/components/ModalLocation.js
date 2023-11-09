import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { router } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { FlatList } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { instance } from "../context/AuthContext";

export default ({ visible, hidden, select }) => {
  const heightAnim = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    height: withTiming(heightAnim.value, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    }),
  }));
  useEffect(() => {
    heightAnim.value = visible ? 600 : 200;
  }, [visible]);
  const onClose = useCallback(() => {
    heightAnim.value = 0;
    setTimeout(hidden, 10);
  }, []);
  Keyboard.addListener("keyboardDidShow", () => {
    heightAnim.value = 300;
  });
  Keyboard.addListener("keyboardDidHide", () => {
    heightAnim.value = 600;
  });
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onPress={onClose}
        />
        <Animated.View style={[style]}>
          <Content onClose={onClose} select={select} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const Content = memo(({ onClose, select }) => {
  const queryClient = useQueryClient();
  const [timeoutId, setTimeOutId] = useState();
  const [params, setParams] = useState({
    Keyword: "",
    PageSize: 10,
  });
  const { isFetching, isLoading, data, fetchNextPage } = useInfiniteQuery(
    ["locations", params.Keyword],
    async ({ pageParam }) => {
      const res = await instance.get("api/locations", {
        params: {
          ...{
            PageSize: params.PageSize,
            Keyword: params?.Keyword || {},
            PageIndex: pageParam,
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
  console.log(params);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Ionicons
          name="close"
          size={18}
          color="#212121"
          onPress={onClose}
          style={{
            padding: 8,
            paddingHorizontal: 16,
          }}
        />
      </View>
      <View
        style={{
          paddingTop: 10,
          width: "90%",
        }}
      >
        <TextInput
          placeholder="Enter your location"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#e4e4e4",
            marginBottom: 10,
          }}
          onChangeText={(text) => {
            if (timeoutId) clearTimeout(timeoutId);
            setTimeOutId(
              setTimeout(() => {
                setParams({ ...params, Keyword: text });
              }, 1000)
            );
          }}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // keyboardDismissMode="on-drag"
        style={{
          width: "100%",
          height: 490,
          paddingHorizontal: 20,
        }}
        data={data?.pages.map((page) => page.data.map((post) => post)).flat()}
        renderItem={({ item }) => (
          <View>
            <LocationItem data={item} onClose={onClose} select={select} />
          </View>
        )}
        //Setting the number of column
        numColumns={1}
        onRefresh={() => {
          if (isFetching) return;
          queryClient.resetQueries("locations");
        }}
        refreshing={isLoading}
        keyExtractor={(item, i) => "_" + item.id}
        onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
        onEndReachedThreshold={0.7} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="large" color="#919191" /> : null
        }
      />
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 20,
          width: "100%",
          alignItems: "center",
        }}
      ></View>
    </View>
  );
});

const LocationItem = memo(({ data, onClose, select }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        padding: 12,
        paddingHorizontal: 6,
        alignItems: "center",
        width: "100%",
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1,
      }}
      onPress={() => {
        select(data);
        onClose();
      }}
    >
      <Ionicons
        name="location-outline"
        size={24}
        color="black"
        style={{
          padding: 6,
          backgroundColor: "#d8d8d8",
          borderRadius: 50,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          marginLeft: 16,
        }}
      >
        {data?.district}, {data?.city}
      </Text>
    </Pressable>
  );
});
