import { memo, useCallback, useRef } from "react";
import { Modal, Pressable, Text, View } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default memo(({ visible, hidden, select, value, userLocation }) => {
  const mapRef = useRef();

  const onClose = useCallback(() => {
    hidden();
  }, []);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.33)",
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
        <View
          style={{
            height: "80%",
          }}
        >
          {/* <View
            style={{
              position:"absolute",
              height:"100%",
              width:"100%"
            }}
          > */}
          {/* <GooglePlacesAutocomplete
            styles={{
              container: {
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: 1,
              },
              textInputContainer: {
                paddingHorizontal: 10,
                borderRadius: 40,
              },
              textInput: {
                borderRadius: 40,
                paddingHorizontal:10
              },
            }}
            placeholder="Search here"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: "AIzaSyColNaHzn6oI0OdZof5ueDxhifV_rrs8Iw",
              language: "vi",
            }}
          /> */}
          <MapView
            onPress={(e) => {
              select(e.nativeEvent.coordinate);
              hidden();
            }}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flexGrow: 1, marginTop: 50 }}
            loadingFallback={<Text>Loading...</Text>}
            region={{
              latitude: value?.latitude || userLocation?.latitude,
              longitude: value?.longitude || userLocation?.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
            googleMapsApiKey="AIzaSyColNaHzn6oI0OdZof5ueDxhifV_rrs8Iw"
            showsUserLocation={true}
          >
            {value?.latitude && (
              <Marker
                coordinate={{
                  latitude: value.latitude,
                  longitude: value.longitude,
                }}
              />
            )}
          </MapView>
        </View>
      </View>
    </Modal>
  );
});
