import { Ionicons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import { memo, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQueryClient } from "react-query";
import { instance } from "../../../src/context/AuthContext";
export default () => {
  const { postId } = useGlobalSearchParams();
  const [cleanlinessRating, setCleanliness] = useState(0);
  const [locationRating, setLocation] = useState(0);
  const [comfortRating, setComfort] = useState(0);
  const [amenitiesRating, setAmenity] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const checkCondition = useMemo(() => {
    if (
      !cleanlinessRating ||
      !locationRating ||
      !amenitiesRating ||
      !comfortRating
    )
      return false;
    return true;
  }, [cleanlinessRating, locationRating, comfortRating, amenitiesRating]);
  const handleSendReview = async () => {
    if (!checkCondition || loading) return;
    try {
      setLoading(true);
      await instance.post("/api/reviews", {
        accommodationId: postId,
        comment,
        cleanlinessRating,
        locationRating,
        comfortRating,
        amenitiesRating,
      });
      setLoading(false);
      queryClient.invalidateQueries(["check-review", postId]);
      router.back();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "#fafeff" }}>
      <View
        style={{
          flex: 1,
          marginBottom: 300,
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
              marginLeft: 10,
            }}
          >
            Review
          </Text>
          <Pressable onPress={handleSendReview}>
            {loading ? (
              <ActivityIndicator size={"small"} color="gray" />
            ) : (
              <Text
                style={{
                  color: checkCondition ? "#ff385c" : "gray",
                  fontSize: 16,
                  fontWeight: checkCondition ? "500" : "400",
                }}
              >
                Send
              </Text>
            )}
          </Pressable>
        </View>
        <RateItem
          title="Cleanliness"
          rate={cleanlinessRating}
          setRate={setCleanliness}
        />
        <RateItem
          title="Location"
          rate={locationRating}
          setRate={setLocation}
        />
        <RateItem
          title="Comfortable"
          rate={comfortRating}
          setRate={setComfort}
        />
        <RateItem title="Amenity" rate={amenitiesRating} setRate={setAmenity} />
        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          placeholder="Write down review"
          style={{
            padding: 8,
            margin: 10,
            backgroundColor: "#f2f2f2",
            height: 120,
            textAlignVertical: "top",
            borderRadius: 6,
            borderColor: "#dcdcdc",
          }}
        />
      </View>
    </ScrollView>
  );
};

const RateItem = memo(({ title, rate, setRate }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#dadada",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          marginLeft: 20,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginRight: 20,
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Ionicons
            onPress={() => {
              setRate(i);
            }}
            key={i}
            name={rate >= i ? "star" : "star-outline"}
            size={20}
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
