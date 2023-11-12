import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { useQueryClient } from "react-query";
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
  const [timeCheckIn, setTimeCheckIn] = useState({});
  const [timeCheckOut, setTimeCheckOut] = useState();
  const [quietTime, setQuietTime] = useState({});
  const [isPetAllowed, setIsAllowPet] = useState(true);
  const [isSmokingAllowed, setIsAllowSmoking] = useState(true);
  const [isEventAllowed, setIsAllowEvent] = useState(true);
  const [isPhotoAllowed, setIsAllowPhoto] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState();
  const [address, setAddress] = useState("Số 1 Đường 1 Phường 1");
  const [numberOfBathrooms, setNumBathrooms] = useState(0);
  const [numberOfBedrooms, setNumBedrooms] = useState(0);
  const [numberOfRooms, setNumRooms] = useState(0);
  const [numberOfBeds, setNumBeds] = useState(0);
  const [maxGuests, setNumGuests] = useState(0);
  const [price, setPrice] = useState(10);
  const [description, setDescription] = useState(
    "Place error messages close to the error; Handle font colors carefully. A few simple techniques help error messages stand out from the surrounding text and code."
  );
  const [name, setName] = useState("Hotel 1");
  const [selectedType, setSelectedType] = useState();
  const [located, setLocated] = useState();
  const [imgs, setImgs] = useState();
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleCreate = async () => {
    let check = true;
    await setError((error) => {
      let newError = {};
      if (!name) {
        newError = { ...newError, name: "Name is required" };
      }
      if (!selectedType) {
        newError = { ...newError, type: "Type is required" };
      }
      if (!address) {
        newError = { ...newError, address: "Address is required" };
      }
      if (!price) {
        newError = { ...newError, price: "Price is required" };
      }
      if (!selectedLocation) {
        newError = { ...newError, location: "Location is required" };
      }
      if (!located) {
        newError = { ...newError, located: "Located is required" };
      }
      if (!imgs || imgs?.length === 0) {
        newError = { ...newError, imgs: "You need add some image" };
      }
      check = !(JSON.stringify(newError) === JSON.stringify({}));
      return newError;
    });
    if (check) return;
    setLoading(true);
    try {
      const imageUrls = await Promise.all(
        imgs?.map(async (img) => {
          return (await uploadImg(img))?.data?.url;
        })
      );
      const res = await instance.post("api/accommodations", {
        name,
        type: selectedType,
        locationId: selectedLocation?.id,
        description,
        address: address,
        ...located,
        numberOfRooms,
        numberOfBeds,
        numberOfBedrooms,
        numberOfBathrooms,
        maxGuests,
        price,
        imageUrls,
        checkInAfter: timeCheckIn.after,
        checkInBefore: timeCheckIn.before,
        checkOutBefore: timeCheckOut,
        isPetAllowed,
        isSmokingAllowed,
        isEventAllowed,
        isPhotoAllowed,
        quietHoursAfter: quietTime.after,
        quietHoursBefore: quietTime.before,
      });
      if (amenities.length > 0) {
        const resAddAmenities = await instance.put(
          "/api/accommodation/amenities",
          {
            accommodationId: res.data.id,
            amenityIds: amenities.map((i) => i.id),
          }
        );
      }
      toast.show("Created accommodation", {
        type: "success",
        placement: "top",
      });
      queryClient.resetQueries("my-posts");
      router.back();
      console.log(res.data, res.request);
    } catch (error) {
      console.log(JSON.stringify(error), error.response, error.response.data);
    } finally {
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
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            Create your accomodation
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
            value={name}
            column
            setValue={setName}
            error={error?.name}
          />
          <Type
            value={selectedType}
            setValue={setSelectedType}
            error={error?.type}
          />
          <InputInfo
            title="Description"
            placeholder="Enter description about your accomodation"
            column
            multiline
            minH={50}
            value={description}
            setValue={setDescription}
          />
          <InputInfo
            title="Address"
            placeholder="Enter your accomodation's address"
            column
            value={address}
            setValue={setAddress}
            error={error?.address}
          />
          <InputInfo
            title="Price"
            value={price}
            type="numeric"
            setValue={setPrice}
            error={error?.price}
          />
          <InputInfo
            title="Guests"
            value={maxGuests}
            type="numeric"
            setValue={setNumGuests}
          />
          <InputInfo
            title="Number of rooms"
            type="numeric"
            value={numberOfRooms}
            setValue={setNumRooms}
          />
          <InputInfo
            title="Number of beds per room"
            type="numeric"
            value={numberOfBeds}
            setValue={setNumBeds}
          />
          {!(selectedType === "Hotel" || selectedType === "Motel") && (
            <InputInfo
              title="Number of bedrooms"
              type="numeric"
              value={numberOfBedrooms}
              setValue={setNumBedrooms}
            />
          )}
          <InputInfo
            title="Number of bathrooms per room"
            type="numeric"
            value={numberOfBathrooms}
            setValue={setNumBathrooms}
          />
          <Location
            value={selectedLocation}
            setValue={setSelectedLocation}
            error={error?.location}
          />
          <PickLocated
            value={located}
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
            <TimeCheckIn value={timeCheckIn} setValue={setTimeCheckIn} />
            <TimeCheckOut value={timeCheckOut} setValue={setTimeCheckOut} />
            <QuietTime value={quietTime} setValue={setQuietTime} />
            <Allow
              title="Allow pets"
              value={isPetAllowed}
              setValue={setIsAllowPet}
            />
            <Allow
              title="Allow smoking"
              value={isSmokingAllowed}
              setValue={setIsAllowSmoking}
            />
            <Allow
              title="Allow events"
              value={isEventAllowed}
              setValue={setIsAllowEvent}
            />
            <Allow
              title="Allow photos"
              value={isPhotoAllowed}
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
            onPress={handleCreate}
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
                Create
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
