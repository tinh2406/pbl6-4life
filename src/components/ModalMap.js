import { memo, useCallback } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default memo(({ visible, hidden, select, value }) => {
  const onClose = useCallback(() => {
    hidden();
  }, []);
  return (
    <Modal visible={visible} transparent animationType="fade">
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
            height: "70%",
          }}
        >
          <MapView
            onPress={(e) => {
              select(e.nativeEvent.coordinate);
              hidden();
            }}
            // ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            loadingFallback={<Text>Loading...</Text>}
            // region={{
            //   latitude:Number(value?.latitude||),
            //   longitude:Number(value?.longitude),
            //   latitudeDelta: 15,
            //   longitudeDelta: 15
            // }}
            initialRegion={{
              latitude: value?.latitude || 16.0544, // Vị trí Đà Nẵng, Việt Nam
              longitude: value?.longitude || 108.2022,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
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
