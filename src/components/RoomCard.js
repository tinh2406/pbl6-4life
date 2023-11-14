import { Feather } from "@expo/vector-icons";
import { router, useNavigation, usePathname } from "expo-router";
import { memo, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign, Ionicons, Octicons } from "react-native-vector-icons";
import { useUser } from "../context/UserContext";
import ModalPrompt from "./ModalPrompt";
import { instance } from "../context/AuthContext";
import { useQueryClient } from "react-query";
export const config = {
  duration: 200,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};
const RoomCard = ({ data }) => {
  const width = useWindowDimensions().width;
  const { user } = useUser();
  const left = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    left: withTiming(left.value, config),
  }));
  const queryClient = useQueryClient()
  const [isLike, setIsLike] = useState(data?.isFavorite);
  const [currentImg, setCurrentImg] = useState(0);
  const [imgWidth, setImgWidth] = useState();
  const imgs = data?.imageUrls.length>0 ? data?.imageUrls : [
    "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.png?alt=media&token=5fccaf62-d0a8-44b7-9bdb-13363d5f3333&_gl=1*idzhgn*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIyNTM0My4yLjEuMTY5NjIyNTg4Ny42MC4wLjA.",
    "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/2ddd49a1-7f8d-4d1e-8fa3-5eb649a9c4ae.png?alt=media&token=88ea50a4-23e7-4f6a-9921-9f5001d474ab&_gl=1*16vwjtw*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIzMTY0MC4zLjAuMTY5NjIzMTY0MC42MC4wLjA.",
    "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/e7e7925f-e9fd-4538-bf7f-ac5ca9d101c7.png?alt=media&token=efeb2f29-1289-469d-8f11-65d0c4fd5b37&_gl=1*1q81hp6*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIzMTY0MC4zLjEuMTY5NjIzMTY3Ny4yMy4wLjA.",
  ];
  useEffect(()=>{
    setIsLike(data?.isFavorite)
  },[data?.isFavorite])
  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 1 / 1.15,
        backgroundColor: "white",
        margin: 0,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      {data?.mod?.id === user?.id && <ManagePost postId={data?.id} />}
      <View
        onLayout={(event) => {
          setImgWidth(event.nativeEvent.layout.width);
        }}
        style={{
          width: "100%",
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            bottom: 10,
            left: 14,
            zIndex: 2,
            padding:4
          }}
          onPress={async () => {
            try {
              setIsLike(!isLike)
              const res = await instance.post("api/favorites", {
                accommodationId: data?.id,
                isFavorite: !isLike,
              }); 
              queryClient.invalidateQueries("favorite-posts")
              queryClient.invalidateQueries("posts")
            } catch (error) {
                console.log(error.response);
            }
          }}
        >
          <AntDesign
            name={isLike ? "heart" : "hearto"}
            size={24}
            color={isLike ? "#ff1f48" : "white"}
          />
        </Pressable>

        <View
          style={{
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            width: "100%",
            bottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "30%",
            }}
          >
            {imgs.map((img, i) => (
              <Octicons
                key={i}
                name="dot-fill"
                style={{ paddingHorizontal: 2 }}
                size={20}
                color={i === currentImg ? "#ffffff" : "rgba(42, 42, 42, 0.43)"}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{ position: "absolute", width: "100%", height: "100%" }}
            onPress={() => {
              router.push(`root/rooms/${data.id}`);
            }}
          />
          <Ionicons
            name="chevron-back"
            size={24}
            style={{ padding: 5, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            color={currentImg === 0 ? "rgba(0, 0, 0, 0.1)" : "white"}
            onPress={() => {
              if (currentImg === 0) return;
              setCurrentImg((i) => i - 1);
              left.value = -(currentImg - 1) * imgWidth;
            }}
            disabled={currentImg === 0}
          />
          <Ionicons
            name="chevron-forward"
            size={24}
            style={{ padding: 5, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            color={
              currentImg === imgs.length - 1 ? "rgba(0, 0, 0, 0.1)" : "white"
            }
            onPress={() => {
              if (currentImg === imgs.length - 1) return;
              setCurrentImg((i) => i + 1);
              left.value = -(currentImg + 1) * imgWidth;
            }}
            disabled={currentImg === imgs.length - 1}
          />
        </View>
        <Swipeable
          onSwipeableWillClose={(e) => {
            if (e === "right") {
              if (currentImg === imgs.length - 1) return;
              left.value = -(currentImg + 1) * imgWidth;
              setCurrentImg(currentImg + 1);
            } else {
              if (left.value === 0) return;
              left.value = -(currentImg - 1) * imgWidth;
              setCurrentImg(currentImg - 1);
            }
          }}
        >
          <Animated.View
            style={[
              {
                flexDirection: "row",
              },
              style,
            ]}
          >
            {imgs.map((img, i) => (
              <Image
                key={i}
                source={{ uri: img, cache: "force-cache" }}
                style={{
                  width: "100%",
                  aspectRatio: 1.314,
                }}
              />
            ))}
          </Animated.View>
        </Swipeable>
      </View>
      <View
        style={{
          height: "50%",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "",
            marginTop: 10,
            height: 64,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "black",
              width: width > 640 ? "67%" : "80%",
            }}
            numberOfLines={2}
          >
            {data?.name}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "black",
              width: width > 640 ? "33%" : "20%",
            }}
          >
            Available: Yes
          </Text>
        </View>
        <View
          style={{
            height: 36,
          }}
        >
          <Text
            style={{
              color: "#2f2f2f",
            }}
            numberOfLines={2}
          >
            {data?.address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#2f2f2f",
            }}
          >
            ${data?.price}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AntDesign name="star" size={20} color="#FFD233" />
            <Text
              style={{
                fontWeight: "bold",
                color: "#2f2f2f",
              }}
            >
              {data?.avgRating}
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        style={{ position: "absolute", width: "100%", height: "100%" }}
        onPress={() => {
          router.push(`root/rooms/${data.id}`);
        }}
      />
    </View>
  );
};

export default memo(RoomCard);

export const ManagePost = memo(({ postId }) => {
  const [visible, setVisible] = useState(false);
  const [delVisible, setDelVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  return (
    <>
      <Feather
        name="more-vertical"
        size={24}
        color={"white"}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 100,
          padding: 5,
        }}
        onPress={() => {
          setVisible(true);
        }}
      />
      {visible && (
        <>
          <Pressable
            style={{ position: "absolute", width, height, zIndex: 1000 }}
            onPress={() => setVisible(false)}
          />
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
              zIndex: 1001,
              top: 10,
              right: 10,
            }}
          >
            <Pressable
              onPress={() => {
                router.push("root/post/edit_post");
                router.setParams({ postId });
              }}
            >
              <Text style={{ fontWeight: "500", width: 100, padding: 6 }}>
                Edit
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setDelVisible(true);
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  width: 100,
                  padding: 6,
                  paddingTop: 0,
                }}
              >
                Delete
              </Text>
            </Pressable>
            <ModalPrompt
              title="Delete"
              message="This accommodation will be deleted?"
              visible={delVisible}
              onCancel={() => setDelVisible(false)}
              onConfirm={async () => {
                try {
                  await instance.delete(`/api/accommodations/${postId}`);
                  queryClient.invalidateQueries("my-posts");
                  if (pathname?.split("/")[2] === "rooms") router.back();
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </View>
        </>
      )}
    </>
  );
});
