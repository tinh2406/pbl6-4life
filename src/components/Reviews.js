import { router } from "expo-router";
import { memo, useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useQuery } from "react-query";
import { instance } from "../context/AuthContext";
import defaultAvt from "../assets/defaultAvatar.png";
const Reviews = memo(({ postId }) => {
  const { data } = useQuery({
    queryKey: ["preview-review", postId],
    queryFn: async () => {
      try {
        const res = await instance.get(`api/reviews/${postId}`, {
          params: { PageSize: 5 },
        });
        return res.data;
      } catch (error) {
        return undefined;
      }
    },
  });
  return (
    <View>
      {data?.data?.[0] ? (
        <>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Reviews
          </Text>
          {data?.data.map((review,i) => (
            <ReviewItem key={review?.userId+i} data={review} />
          ))}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                router.push(`/root/reviews/${postId}`);
              }}
              style={{
                width: "60%",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Show more reviews
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Text
          style={{
            marginVertical: 10,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          There are no reviews yet
        </Text>
      )}
    </View>
  );
});

export default Reviews;

const ReviewItem = memo(({ data }) => {
  return (
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
            fontWeight: "500",
          }}
        >
          {data?.user.name}
        </Text>
        <Text style={{}} numberOfLines={3}>
          {data?.comment}
        </Text>
      </View>
    </View>
  );
});

export const CheckReview = memo(({ postId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["check-review", postId],
    queryFn: async () => {
      try {
        const res = await instance.get(`/api/reviews/check-review/${postId}`);
        return res.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        return undefined;
      }
    },
  });
  return (
    <>
      {data?.isSuccess && (
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            marginTop: 20,
            marginHorizontal: 30,
            borderRadius: 4,
            backgroundColor: "#efc52e",
          }}
          onPress={() => {
            router.push("root/reviews/create");
            router.setParams({ postId });
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "white",
            }}
          >
            Review this accommodation
          </Text>
        </Pressable>
      )}
    </>
  );
});
