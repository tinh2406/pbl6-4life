import { Ionicons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { useQuery, useQueryClient } from "react-query";
import { Amenities } from "../../../src/components/Amenities";
import {
  ImagesOfAccomodation,
  InputInfo,
  Location,
  PickLocated,
  Type,
} from "../../../src/components/PostInfo";
import {
  Allow,
  QuietTime,
  TimeCheckIn,
  TimeCheckOut,
} from "../../../src/components/Rules";
import { instance } from "../../../src/context/AuthContext";
import uploadImg from "../../../src/utils/uploadImg";

export default () => {
  const { postId } = useGlobalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const res = await instance.get(`/api/accommodations/${postId}`);
      return res.data;
    },
  });
  console.log(data);
  const [timeCheckIn, setTimeCheckIn] = useState();
  const [timeCheckOut, setTimeCheckOut] = useState();
  const [quietTime, setQuietTime] = useState();
  const [isPetAllowed, setIsAllowPet] = useState();
  const [isSmokingAllowed, setIsAllowSmoking] = useState();
  const [isEventAllowed, setIsAllowEvent] = useState();
  const [isPhotoAllowed, setIsAllowPhoto] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [address, setAddress] = useState();
  const [numberOfBathrooms, setNumBathrooms] = useState();
  const [numberOfBedrooms, setNumBedrooms] = useState();
  const [numberOfRooms, setNumRooms] = useState();
  const [numberOfBeds, setNumBeds] = useState();
  const [maxGuests, setNumGuests] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [selectedType, setSelectedType] = useState();
  const [located, setLocated] = useState();
  const [imgs, setImgs] = useState();
  const [amenities, setAmenities] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      let imageUrls;
      if (imgs?.length > 0)
        imageUrls = await Promise.all(
          imgs?.map(async (img) => {
            if (img?.assetId) return (await uploadImg(img))?.data?.url;
            else return img.uri;
          })
        );
      const res = await instance.put(`api/accommodations/${postId}`, {
        name: name || data?.name,
        type: selectedType || data?.type,
        locationId: selectedLocation?.id || data?.location.id,
        description: description || data?.description,
        address: address || data?.address,
        longitude: located?.longitude || data?.longitude,
        latitude: located?.latitude || data?.latitude,
        numberOfRooms: numberOfRooms || data?.numberOfRooms,
        numberOfBeds: numberOfBeds || data?.numberOfBeds,
        numberOfBedrooms: numberOfBedrooms || data?.numberOfBedrooms,
        numberOfBathrooms: numberOfBathrooms || data?.numberOfBathrooms,
        maxGuests: maxGuests || data?.maxGuests,
        price: price || data?.maxGuests,
        imageUrls: imageUrls || data?.imageUrls,
        checkInAfter: timeCheckIn?.after || data?.checkInAfter,
        checkInBefore: timeCheckIn?.before || data?.checkInBefore,
        checkOutBefore: timeCheckOut || data?.timeCheckOut,
        isPetAllowed: isPetAllowed || data?.isPetAllowed,
        isSmokingAllowed: isSmokingAllowed || data?.isSmokingAllowed,
        isEventAllowed: isEventAllowed || data?.isEventAllowed,
        isPhotoAllowed: isPhotoAllowed || data?.isPhotoAllowed,
        quietHoursAfter: quietTime?.after || data?.quietHoursAfter,
        quietHoursBefore: quietTime?.before || data?.quietHoursBefore,
      });
      if (amenities?.length > 0) {
        const resAddAmenities = await instance.post(
          "/api/accommodation/amenities",
          {
            accommodationId: res.data.id,
            amenityIds: amenities.map((i) => i.id),
          }
        );
      }
      toast.show("Update accommodation success", {
        type: "success",
        placement: "top",
      });
      queryClient.resetQueries("my-posts");
      router.back();
    } catch (error) {
      console.log(
        error,
        JSON.stringify(error),
        error.response,
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(data?.imageUrls)
    setImgs(data?.imageUrls?.map((i) => ({ uri: i })))
  },[data])
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
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            Update accomodation
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <InputInfo
            title="Name"
            placeholder="Enter your accomodation's name"
            value={name || data?.name}
            column
            setValue={setName}
            error={error?.name}
          />
          <Type
            value={selectedType || data?.type}
            setValue={setSelectedType}
            error={error?.type}
          />
          <InputInfo
            title="Description"
            placeholder="Enter description about your accomodation"
            column
            multiline
            minH={50}
            value={description || data?.description}
            setValue={setDescription}
          />
          <InputInfo
            title="Address"
            placeholder="Enter your accomodation's address"
            column
            value={address || data?.address}
            setValue={setAddress}
            error={error?.address}
          />
          <InputInfo
            title="Price"
            value={price || data?.price}
            type="numeric"
            setValue={setPrice}
            error={error?.price}
          />
          <InputInfo
            title="Guests"
            value={maxGuests || data?.maxGuests}
            type="numeric"
            setValue={setNumGuests}
          />
          <InputInfo
            title="Number of rooms"
            type="numeric"
            value={numberOfRooms || data?.numberOfRooms}
            setValue={setNumRooms}
          />
          <InputInfo
            title="Number of beds per room"
            type="numeric"
            value={numberOfBeds || data?.numberOfBeds}
            setValue={setNumBeds}
          />
          {!(selectedType === "Hotel" || selectedType === "Motel") && (
            <InputInfo
              title="Number of bedrooms"
              type="numeric"
              value={numberOfBedrooms || data?.numberOfBedrooms}
              setValue={setNumBedrooms}
            />
          )}
          <InputInfo
            title="Number of bathrooms per room"
            type="numeric"
            value={numberOfBathrooms || data?.numberOfBathrooms}
            setValue={setNumBathrooms}
          />
          <Location
            value={selectedLocation || data?.location}
            setValue={setSelectedLocation}
            error={error?.location}
          />
          <PickLocated
            value={
              located || {
                latitude: data?.latitude,
                longitude: data?.longitude,
              }
            }
            setValue={setLocated}
            error={error?.located}
          />
          <Amenities value={amenities} setValue={setAmenities} />
          <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                marginBottom: 6,
              }}
            >
              House rules
            </Text>
            <TimeCheckIn
              value={
                timeCheckIn || {
                  before: data?.checkInBefore,
                  after: data?.checkInAfter,
                }
              }
              setValue={setTimeCheckIn}
            />
            <TimeCheckOut
              value={timeCheckOut || data?.checkOutBefore}
              setValue={setTimeCheckOut}
            />
            <QuietTime
              value={
                quietTime || {
                  before: data?.quietHoursBefore,
                  after: data?.quietHoursAfter,
                }
              }
              setValue={setQuietTime}
            />
            <Allow
              title="Allow pets"
              value={isPetAllowed || data?.isPetAllowed}
              setValue={setIsAllowPet}
            />
            <Allow
              title="Allow smoking"
              value={isSmokingAllowed || data?.isSmokingAllowed}
              setValue={setIsAllowSmoking}
            />
            <Allow
              title="Allow events"
              value={isEventAllowed || data?.isEventAllowed}
              setValue={setIsAllowEvent}
            />
            <Allow
              title="Allow photos"
              value={isPhotoAllowed || data?.isPhotoAllowed}
              setValue={setIsAllowPhoto}
            />
          </View>
          <ImagesOfAccomodation
            value={imgs}
            setValue={setImgs}
            error={error?.imgs}
          />

          <Pressable
            style={{
              borderRadius: 10,
              backgroundColor: loading ? "#c1c1c1" : "#ff385c",
              padding: 10,
              marginTop: 100,
            }}
            onPress={handleUpdate}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color="gray" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Update
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
