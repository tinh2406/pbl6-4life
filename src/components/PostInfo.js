import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { memo, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import ModalLocation from "./ModalLocation";
import ModalMap from "./ModalMap";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getCurrentPositionAsync } from "expo-location";
import Image from "./Image";

export const Location = memo(({ value, setValue, error }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 4,
        }}
      >
        Location
      </Text>
      <Pressable
        style={{
          padding: 6,
          backgroundColor: "#e4e4e4",
          marginRight: 5,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: "#d7d7d7",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons
          name="location-outline"
          size={16}
          color="black"
          style={{
            paddingHorizontal: 6,
          }}
        />
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {value ? `${value.district}, ${value.city}` : "Select location"}
        </Text>
      </Pressable>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
      <ModalLocation
        hidden={() => {
          setModalVisible(false);
        }}
        select={setValue}
        visible={modalVisible}
      />
    </View>
  );
});

export const InputInfo = memo(
  ({
    title,
    placeholder,
    type,
    value,
    setValue,
    column,
    multiline,
    minH,
    error,
  }) => {
    const numericChange = (value) => setValue(value);
    useEffect(() => {
      if (type === "numeric") {
        numericChange(value);
      }
    }, [value, numericChange]);

    return (
      <View
        style={{
          flexDirection: column ? "column" : "row",
          alignItems: column ? "flex-start" : "center",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
        {type === "numeric" ? (
          <View style={{}}>
            {value !== undefined && (
              <NumericInput
                type="plus-minus"
                value={value}
                onChange={numericChange}
                minValue={0}
                totalHeight={34}
                totalWidth={80}
                containerStyle={{
                  backgroundColor: "white",
                }}
                iconSize={25}
                valueType="integer"
                rounded
                textColor="#000000"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#128851"
                leftButtonBackgroundColor="#d29b9b"
              />
            )}
          </View>
        ) : (
          <TextInput
            multiline={multiline}
            style={{
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 4,
              fontSize: 15,
              backgroundColor: "white",
              paddingVertical: 4,
              borderColor: "#e2e2e2",
              width: column ? "100%" : 90,
              textAlign: column ? "left" : "right",
              minHeight: multiline ? minH || 50 : 20,
              textAlignVertical: multiline ? "top" : "auto",
            }}
            placeholder={placeholder}
            value={value}
            onChangeText={setValue}
          />
        )}
        {error && (
          <Text
            style={{
              fontSize: 15,
              color: "#ff2a00",
            }}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

export const Type = memo(({ value, setValue, error }) => {
  const [types, setTypes] = useState();
  useEffect(() => {
    const getTypes = () => {
      setTypes(["Homestay", "Villa", "Other"]);
    };
    getTypes();
  }, []);
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 4,
        }}
      >
        Type
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {types?.map((i, index) => (
          <Pressable
            onPress={() => setValue(i)}
            key={i}
            style={{
              flex: 1,
              justifyContent: "center",
              paddingVertical: 8,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderTopLeftRadius: index === 0 ? 5 : 0,
              borderBottomLeftRadius: index === 0 ? 5 : 0,
              borderTopRightRadius: index === types?.length - 1 ? 5 : 0,
              borderBottomRightRadius: index === types?.length - 1 ? 5 : 0,
              borderColor: value !== i ? "rgba(202, 202, 202, 0.3)" : "#FF385C",
              backgroundColor: value !== i ? "white" : "#FF385C",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                color: value !== i ? "black" : "white",
              }}
            >
              {i}
            </Text>
          </Pressable>
        ))}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
export const PickLocated = memo(({ value, setValue, error }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const located = await getCurrentPositionAsync();
      setLocation({
        latitude: located.coords.latitude,
        longitude: located.coords.longitude,
      });
    };
    getLocation();
  }, []);

  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        Coordinate
      </Text>
      <Pressable
        style={{
          width: "100%",
          marginTop: 10,
          aspectRatio: 1.618,
          borderRadius: 10,
          overflow: "hidden",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <MapView
          // ref={mapRef}
          showsUserLocation
          scrollEnabled={false}
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          region={{
            latitude: value?.latitude || location?.latitude,
            longitude: value?.longitude || location?.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
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
          {!!value?.latitude && (
            <Marker
              coordinate={{
                latitude: value?.latitude || 16.0544,
                longitude: value?.longitude || 108.2022,
              }}
            />
          )}
        </MapView>
      </Pressable>
      <ModalMap
        visible={modalVisible}
        hidden={() => setModalVisible(false)}
        select={setValue}
        value={value}
        userLocation={location}
      />
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
export const ImagesOfAccomodation = memo(({ value, setValue, error }) => {
  const select = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,

      quality: 1,
    });
    if (!result.canceled) {
      setValue(result.assets);
    }
  };
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginBottom: 4,
        }}
      >
        Images of accommodation
      </Text>
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: "#d1d1d1",
          backgroundColor: "white",
          borderRadius: 10,
          marginHorizontal: 10,
          overflow: "hidden",
          aspectRatio: 1.59,
        }}
        onPress={select}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ color: "#0091ff", fontWeight: "500" }}>
            Select more image
          </Text>
          <Entypo name="image" size={72} color="#0091ff" />
        </View>
      </Pressable>
      <View style={{ paddingHorizontal: 10 }}>
        {value?.map((img, i) => (
          <View
            key={i}
            style={{
              position: "relative",
            }}
          >
            <Image
              src={img.uri}
              style={{
                borderWidth: 1,
                borderColor: "#dedede",
                borderRadius: 10,
                marginTop: 10,
                width: "100%",
                aspectRatio: 3 / 2,
              }}
            />
            <Ionicons
              name="close-circle"
              size={24}
              style={{ position: "absolute", top: 15, right: 5 }}
              onPress={() => {
                setValue((last) => last?.filter((i) => i !== img));
              }}
            />
          </View>
        ))}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
