import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { memo, useCallback, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ModalReserve from "../../../src/components/ModalReserve";
import { MarkerClusterer } from "@teovilla/react-native-web-maps";
import { useQuery, useQueryClient } from "react-query";
import { instance } from "../../../src/context/AuthContext";
import { formatToFE } from "../../../src/utils/formatTime";
import Amenities from "../../../src/components/Amenities";
import { useUser } from "../../../src/context/UserContext";
import { ManagePost } from "../../../src/components/RoomCard";
import ModalPayment from "../../../src/components/ModalPayment";
import defaultAvt from "../../../src/assets/defaultAvatar.png";
import ModalPrompt from "../../../src/components/ModalPrompt";
import { useToast } from "react-native-toast-notifications";
import Loading from "../../../src/screens/Loading";
import Reviews from "../../../src/components/Reviews";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const config = {
  duration: 200,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};

export default () => {
  const width = useWindowDimensions().width;
  const { postId } = useLocalSearchParams();
  const { user, onVerifyEmail } = useUser();
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await instance.get(`/api/accommodations/${postId}`);
      return res.data;
    },
  });
  const [isLike, setIsLike] = useState(data?.isFavorite);
  const imgs = data?.imageUrls.length > 0 ? data?.imageUrls : [];
  const [modalBookShow, setModalBookShow] = useState(false);
  const [modalPaymentShow, setModalPaymentShow] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [dataPayment, setDataPayment] = useState();
  const [confirmEmailVisible, setConfirmEmailVisible] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const toast = useToast();
  const handleShare = useCallback(() => {
    console.log("share");
  }, []);
  const handleGoBack = useCallback(() => {
    router.back();
  }, []);
  const handleBook = useCallback(async (payload) => {
    if (!user?.emailConfirmed) {
      if (!(await onVerifyEmail()).success) return;
      setConfirmEmailVisible(true);
      return;
    }
    try {
      const res = await instance.post("/api/bookings", payload);
      setDataPayment(res.data);
      setModalPaymentShow(true);
      return { success: true };
    } catch (error) {
      console.log(JSON.stringify(error));
      console.log(error.response, error.response.data.title);
      if (
        error?.response?.data?.title?.includes(
          "has a Booking and has another Booking"
        )
      )
        toast.show("This accommodation runs out of room", {
          type: "danger",
          placement: "top",
        });
    }
  }, []);
  if (isLoading||isFetching) return <Loading />;

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <View
          onLayout={(event) => {
            setImgWidth(event.nativeEvent.layout.width);
          }}
          style={{
            width: "100%",
            borderRadius: 20,
            position: "relative",
            marginTop: 0,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={"black"}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 11,
              backgroundColor: "white",
              padding: 5,
              borderRadius: 20,
            }}
            onPress={handleGoBack}
          />
          {data?.mod?.id === user?.id && <ManagePost postId={postId} />}
          <Pressable
            style={{
              position: "absolute",
              bottom: 10,
              left: 14,
              zIndex: 11,
              padding: 4,
            }}
            onPress={async () => {
              try {
                setIsLike(!isLike);
                await instance.post("api/favorites", {
                  accommodationId: data?.id,
                  isFavorite: !isLike,
                });
                queryClient.invalidateQueries("favorite-posts");
                queryClient.invalidateQueries("posts");
              } catch (error) {
                console.log(error.response);
              }
            }}
          >
            <AntDesign
              name={isLike ? "heart" : "hearto"}
              size={24}
              color={isLike ? "#ef4b69" : "white"}
            />
          </Pressable>
          <MaterialIcons
            name="share"
            size={20}
            color={"white"}
            style={{
              position: "absolute",
              bottom: 10,
              right: 20,
              zIndex: 11,
            }}
            onPress={handleShare}
          />
          <ImagePost imgs={imgs} imgWidth={imgWidth} />
        </View>
        <ScrollView>
          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                margin: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                }}
              >
                {data?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Ionicons
                  name="star"
                  size={18}
                  style={{
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    marginRight: 10,
                  }}
                >
                  {data?.avgAccuracyRating}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  {data?.totalReview} review
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {data?.address}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                {data?.description}
              </Text>
            </View>
            <Amenities postId={postId} />
            <View
              style={{
                marginHorizontal: 20,
                borderTopWidth: 1,
                borderColor: "#d5d5d5",
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Where you'll be
              </Text>
              <Pressable
                onPress={() => {
                  router.push("root/map");
                  router.setParams({
                    latitude: data?.latitude,
                    longitude: data?.longitude,
                  });
                }}
                style={{
                  width: "100%",
                  marginTop: 10,
                  aspectRatio: 1.618,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <MapView
                  // ref={mapRef}

                  scrollEnabled={false}
                  provider={PROVIDER_GOOGLE}
                  style={{
                    flex: 1,
                  }}
                  region={{
                    latitude: data?.latitude,
                    longitude: data?.longitude,
                    latitudeDelta: 1.5,
                    longitudeDelta: 1.5,
                  }}
                  customMapStyle={[
                    {
                      elementType: "labels.icon",
                      stylers: [
                        {
                          visibility: "off",
                        },
                      ],
                    },
                  ]}
                  loadingFallback={
                    <View>
                      <Text>Loading</Text>
                    </View>
                  }
                  googleMapsApiKey="AIzaSyDi3Ex6q__zEQxqkNBB0A7xgOc7KKDIgk0"
                >
                  <Marker
                    coordinate={{
                      latitude: Number(data?.latitude),
                      longitude: Number(data?.longitude),
                    }}
                  />
                </MapView>
              </Pressable>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                borderTopWidth: 1,
                borderColor: "#d5d5d5",
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
                onPress={() => {
                  // router.push("/root/profile/user123");
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Hosted by {data?.mod.name}
                  </Text>
                </View>
                <Image
                  source={
                    data?.mod?.avatar
                      ? {
                          uri: data?.mod?.avatar,
                          cache: "force-cache",
                        }
                      : defaultAvt
                  }
                  style={{ width: 40, height: 40, borderRadius: 40 }}
                />
              </Pressable>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={16}
                  style={{
                    marginRight: 5,
                  }}
                />
                <Text>Identity verified</Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                borderTopWidth: 1,
                borderColor: "#d5d5d5",
              }}
            >
              <RatingItem
                title="Cleanliness"
                value={data?.avgCleanlinessRating}
              />
              <RatingItem title="Amenities" value={data?.avgAmenitiesRating} />
              <RatingItem title="Location" value={data?.avgLocationRating} />
              <RatingItem title="Comfort" value={data?.avgComfortRating} />
              <Reviews postId={postId} />
            </View>
            <View
              style={{
                marginHorizontal: 20,
                borderTopWidth: 1,
                borderColor: "#d5d5d5",
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                House rules
              </Text>
              {data?.checkInAfter && data?.checkInBefore && (
                <Text
                  style={{
                    color: "#282828",
                    paddingVertical: 4,
                  }}
                >
                  Check in: {formatToFE(data.checkInAfter)}-
                  {formatToFE(data.checkInBefore)}
                </Text>
              )}
              {data?.checkOutBefore && (
                <Text
                  style={{
                    color: "#282828",
                    paddingVertical: 4,
                  }}
                >
                  Check out before: {formatToFE(data?.checkOutBefore)}
                </Text>
              )}
              {data?.quietHoursAfter && data?.quietHoursBefore && (
                <Text
                  style={{
                    color: "#282828",
                    paddingVertical: 4,
                  }}
                >
                  Quiet time: {formatToFE(data?.quietHoursBefore)}-
                  {formatToFE(data?.quietHoursAfter)}
                </Text>
              )}
              <Text
                style={{
                  color: "#282828",
                  paddingVertical: 4,
                }}
              >
                {data?.isPhotoAllowed
                  ? "Photos is allowed"
                  : "No photo allowed"}
              </Text>
              <Text
                style={{
                  color: "#282828",
                  paddingVertical: 4,
                }}
              >
                {data?.isEventAllowed
                  ? "Parties or events are allowed"
                  : "No parties or events"}
              </Text>
              <Text
                style={{
                  color: "#282828",
                  paddingVertical: 4,
                }}
              >
                {data?.isPetAllowed ? "Pets is allowed" : "No pets"}
              </Text>
              <Text
                style={{
                  color: "#282828",
                  paddingVertical: 4,
                }}
              >
                {data?.isSmokingAllowed ? "Smoking is allowed" : "No smoking"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      <ModalReserve
        data={data}
        visible={modalBookShow}
        hidden={() => {
          setModalBookShow(false);
        }}
        onConfirm={handleBook}
      />
      <ModalPayment
        data={dataPayment}
        visible={modalPaymentShow}
        onConfirm={() => {}}
        hidden={() => {
          setModalPaymentShow(false);
        }}
      />
      <ModalPrompt
        title="Verify your code"
        message="Please enter the code sent to your email"
        visible={confirmEmailVisible}
        onChangeText={setVerifyCode}
        onCancel={() => setConfirmEmailVisible(false)}
        code={verifyCode}
        onConfirm={async () => {
          try {
            await onConfirmEmail(verifyCode);
          } catch (error) {
            return { error: true };
          }
        }}
      />
      {data?.mod?.id === user?.id || (
        <View
          style={{
            left: 0,
            bottom: 0,
            position: "absolute",
            backgroundColor: "#ffffff",
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.7,
            shadowRadius: 3.05,
            elevation: 4,
            zIndex: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: "500" }}>${data?.price}/ night</Text>
          <Pressable
            style={{
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#FF385C",
            }}
            onPress={() => {
              setModalBookShow(true);
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Reserve</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const ImagePost = memo(({ imgs, imgWidth }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const left = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    left: withTiming(left.value, config),
  }));
  return (
    <>
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
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          flexDirection: "row",
        }}
      >
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
    </>
  );
});

const RatingItem = memo(({ title, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        width: "100%",
      }}
    >
      <Text
        style={{
          width: 80,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: "#C4C9D4",
          height: 6,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${value * 20 || 0}%`,
            backgroundColor: "#FF385C",
            height: "100%",
          }}
        />
      </View>
      <Text
        style={{
          width: 40,
          marginLeft: 10,
        }}
      >
        {value?.toFixed(2) || 0}
      </Text>
    </View>
  );
});
