import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { DatePickerModal } from "react-native-paper-dates";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../context/AuthContext";

export default ({ visible, hidden, onConfirm }) => {
  const [types,setTypes]=useState()
  useEffect(() => {
    const getTypes = async () => {
      const local = await AsyncStorage.getItem("types");
      if (local) {
        setTypes(JSON.parse(types));
        return;
      }
      try {
        const fetch = await instance.get("api/types");
        if (fetch) {
          setTypes(fetch.data);
          AsyncStorage.setItem("types", JSON.stringify(fetch.data));
          return;
        }
      } catch (error) {}

      setTypes(["Hotel", "Motel", "Homestay", "Resort", "Villa"]);
    };
    getTypes();
  }, []);
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [type, setType] = useState();
  const [timeCheckIn, setTimeCheckIn] = useState();
  const [timeCheckOut, setTimeCheckOut] = useState();
  const [number, setNumber] = useState();
  const heightAnim = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    height: withTiming(heightAnim.value, {
      duration: 200,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    }),
  }));
  useEffect(() => {
    heightAnim.value = visible ? 530 : 200;
  }, [visible]);
  const onClose = () => {
    heightAnim.value = 0;
    setTimeout(hidden, 10);
  };

  const [checkInOpen, setCheckInOpen] = React.useState(false);
  const onDismissCheckIn = React.useCallback(() => {
    setCheckInOpen(false);
  }, [setCheckInOpen]);
  const onConfirmCheckIn = React.useCallback(
    (params) => {
      setCheckInOpen(false);
      setTimeCheckIn(params.date);
    },
    [setCheckInOpen, setTimeCheckIn]
  );
  const [checkOutOpen, setCheckOutOpen] = React.useState(false);
  const onDismissCheckOut = React.useCallback(() => {
    setCheckOutOpen(false);
  }, [setCheckOutOpen]);
  const onConfirmCheckOut = React.useCallback(
    (params) => {
      setCheckOutOpen(false);
      setTimeCheckOut(params.date);
    },
    [setCheckOutOpen, setTimeCheckOut]
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
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
        <Animated.View style={[style]}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                borderBottomWidth: 1,
                borderBottomColor: "#d1d1d1",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Ionicons
                name="close"
                size={18}
                color="#212121"
                onPress={onClose}
                style={{
                  padding: 8,
                  paddingHorizontal: 16,
                }}
              />
              <Text
                style={{
                  fontWeight: "700",
                  color: "#212121",
                }}
              >
                Filters
              </Text>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#d1d1d1",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Type of place
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  marginTop: 10,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Pressable
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    paddingVertical: 16,
                    borderColor: type ? "rgba(163, 155, 155, 0.3)" : "#FF385C",
                    backgroundColor: type ? "white" : "#FF385C",
                    borderLeftWidth: 1,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  onPress={() => setType()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: type ? "black" : "white",
                      fontWeight: "600",
                    }}
                  >
                    Any
                  </Text>
                </Pressable>
                {types?.map((i) => (
                  <Pressable
                    onPress={() => setType(i)}
                    key={i}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      paddingVertical: 16,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderRightWidth: 1,
                      borderColor:
                        type !== i ? "rgba(163, 155, 155, 0.3)" : "#FF385C",
                      backgroundColor: type !== i ? "white" : "#FF385C",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "600",
                        color: type !== i ? "black" : "white",
                      }}
                    >
                      {i}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#d1d1d1",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Time check-in
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 10,
                }}
              >
                <Entypo
                  name="block"
                  size={24}
                  color="black"
                  style={{
                    height: 40,
                    width: 40,
                    lineHeight: 38,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: timeCheckIn ? "black" : "#ff385c",
                    color: timeCheckIn ? "black" : "#ff385c",
                    marginHorizontal: 20,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                  onPress={() => setTimeCheckIn()}
                />
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderRadius: 30,
                    padding: 12,
                    borderColor: timeCheckIn ? "#ff385c" : "black",
                    backgroundColor: "white",
                    height: 40,
                    minWidth: 40,
                    justifyContent: "space-between",
                  }}
                  onPress={() => {
                    setCheckInOpen(true);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: timeCheckIn ? "#FF385C" : "black",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {timeCheckIn
                      ? format(timeCheckIn, "dd/MM/yyyy")
                      : "Select date"}
                  </Text>
                </Pressable>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={checkInOpen}
                  onDismiss={onDismissCheckIn}
                  date={timeCheckIn || new Date()}
                  onConfirm={onConfirmCheckIn}
                />
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "#d1d1d1",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Time check-out
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 10,
                }}
              >
                <Entypo
                  name="block"
                  size={24}
                  color="black"
                  style={{
                    height: 40,
                    width: 40,
                    lineHeight: 38,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: timeCheckOut ? "black" : "#ff385c",
                    color: timeCheckOut ? "black" : "#ff385c",
                    marginHorizontal: 20,
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                  onPress={() => setTimeCheckOut()}
                />
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderRadius: 30,
                    padding: 12,
                    borderColor: timeCheckOut ? "#ff385c" : "black",
                    backgroundColor: "white",
                    height: 40,
                    minWidth: 40,
                    justifyContent: "space-between",
                  }}
                  onPress={() => {
                    setCheckOutOpen(true);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: timeCheckOut ? "#ff385c" : "black",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {timeCheckOut
                      ? format(timeCheckOut, "dd/MM/yyyy")
                      : "Select date"}
                  </Text>
                </Pressable>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={checkOutOpen}
                  onDismiss={onDismissCheckOut}
                  date={timeCheckOut || new Date()}
                  onConfirm={onConfirmCheckOut}
                />
              </View>
            </View>
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 20,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  width: "90%",
                }}
              >
                Number of person
              </Text>
              <ScrollView
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
              >
                <Pressable
                  style={{
                    backgroundColor: number ? "white" : "#FF385C",
                    padding: 8,
                    paddingHorizontal: 13,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: number ? "rgba(0, 0, 0, 0.3)" : "#FF385C",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  onPress={() => setNumber()}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: number ? "black" : "white",
                    }}
                  >
                    Any
                  </Text>
                </Pressable>
                {nums.map((i) => (
                  <Pressable
                    key={i}
                    style={{
                      backgroundColor: number !== i ? "white" : "#FF385C",
                      padding: 8,
                      paddingHorizontal: 13,
                      borderRadius: 20,
                      borderWidth: 1,
                      marginRight: 10,
                      borderColor:
                        number !== i ? "rgba(0, 0, 0, 0.3)" : "#FF385C",
                    }}
                    onPress={() => setNumber(i)}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: number !== i ? "black" : "white",
                      }}
                    >
                      {i}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 10,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                borderTopWidth: 1,
                borderTopColor: "#d1d1d1",
              }}
              onPress={() => {
                setType();
                setNumber();
                setTimeCheckIn();
                setTimeCheckOut();
                onClose();
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                }}
              >
                Clear all
              </Text>
              <Pressable
                onPress={() => {
                  onConfirm({ type, timeCheckIn, timeCheckOut, number });
                  onClose();
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: "#ff385c",
                    borderRadius: 4,
                  }}
                >
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
