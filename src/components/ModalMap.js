import { useCallback } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import MapView from "react-native-maps";

export default ({ visible, hidden, select }) => {
    const onClose = useCallback(()=>{
        hidden()
    },[])
    return (
      <Modal visible={visible} transparent animationType="fade">
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            backgroundColor:"rgba(0, 0, 0, 0.33)"
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
          <View style={{
            height:"70%"
          }}>
            <MapView
      onPress={((e)=>{
        select(e.nativeEvent.coordinate)
        hidden()
      })}
        // ref={mapRef}
        provider="google"
        style={{ flex: 1 }}
        loadingFallback={<Text>Loading...</Text>}
        // googleMapsApiKey="AIzaSyDi3Ex6q__zEQxqkNBB0A7xgOc7KKDIgk0"
      ></MapView>
          </View>
        </View>
      </Modal>
    );
  };