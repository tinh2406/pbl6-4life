import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import { DatePickerModal } from "react-native-paper-dates";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useUser } from "../context/UserContext";

const callNumDays = (before, after) => {
  const timeDifference = after - before;

  return timeDifference / (1000 * 60 * 60 * 24);
};
export default ({ visible, hidden, onConfirm, data }) => {
  const { user } = useUser();
  const [pickShow, setPickShow] = useState(false);
  const [timeCheckIn, setTimeCheckIn] = useState();
  const [timeCheckOut, setTimeCheckOut] = useState();
  const [numRooms, setNumRooms] = useState(1);
  const [note, setNote] = useState("Không cần note vẫn được chứ nhỉ");
  const [loading, setLoading] = useState(false);
  const heightAnim = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    height: withTiming(heightAnim.value, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    }),
  }));
  useEffect(() => {
    heightAnim.value = visible ? (user ? 450 : 600) : 300;
  }, [visible, user]);
  const onClose = () => {
    heightAnim.value = 0;
    setTimeout(hidden, 10);
  };
  const onConfirmTime = ({ startDate, endDate }) => {
    setTimeCheckIn(startDate);
    setTimeCheckOut(endDate);
    setPickShow(false);
  };
  const tomorrow = useMemo(() => {
    const today = new Date();
    const tomorrowDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    return tomorrowDate;
  }, []);
  const nextTomorrow = useMemo(()=>{
    const today = new Date();
    const tomorrowDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2
    );
    return tomorrowDate;
  },)
  const numsDay = useMemo(() => {
    if (!(timeCheckIn && timeCheckOut)) return;
    return Math.ceil(callNumDays(timeCheckIn, timeCheckOut));
  }, [timeCheckIn, timeCheckOut]);
  const handleBook = async () => {
    if (!numsDay || loading) return;
    setLoading(true)
    const res = await onConfirm({
      accommodationId: data.id,
      checkInDate: timeCheckIn,
      checkOutDate: timeCheckOut,
      numberOfRooms: numRooms,
      note,
    });
    if (res?.success) onClose();
    setLoading(false)
  };
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
        <DatePickerModal
          locale="en"
          mode="range"
          visible={pickShow}
          onDismiss={() => {
            setPickShow(false);
          }}
          startDate={timeCheckIn || tomorrow}
          endDate={timeCheckOut || nextTomorrow}
          onConfirm={onConfirmTime}
        />
        <Pressable
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onPress={onClose}
        />
        <Animated.View style={[style]}>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: "white",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
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
            </View>

            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                }}
              >
                ${data?.price}/night
              </Text>
              <View
                style={{
                  marginTop: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#c6c6c6",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: "#c6c6c6",
                      width: "50%",
                      padding: 6,
                    }}
                    onPress={() => setPickShow(true)}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Check in
                    </Text>
                    <Text>
                      {timeCheckIn
                        ? format(timeCheckIn, "dd/MM/yyyy")
                        : "Select date"}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      width: "50%",
                      padding: 6,
                      borderBottomWidth: 1,
                      borderColor: "#c6c6c6",
                    }}
                    onPress={() => setPickShow(true)}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Check out
                    </Text>
                    <Text>
                      {timeCheckOut
                        ? format(timeCheckOut, "dd/MM/yyyy")
                        : "Select date"}
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    padding: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Rooms
                  </Text>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <NumericInput
                      type="plus-minus"
                      value={numRooms}
                      onChange={(value) => setNumRooms(value)}
                      minValue={1}
                      totalHeight={34}
                    />
                  </View>
                </View>
              </View>
              <TextInput
                style={{
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderColor: "#c6c6c6",
                  paddingTop: 6,
                  textAlignVertical: "top",
                }}
                placeholder="Leave somthing for host?"
                value={note}
                onChangeText={setNote}
                multiline
              />
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{}}>
                  ${data?.price}x{numRooms}x{numsDay || "0"}
                </Text>
                <Text style={{}}>
                  {numsDay ? data?.price * numRooms * numsDay : 0}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{}}>Fee</Text>
                <Text style={{}}>15</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTopWidth: 1,
                  borderColor: "#c6c6c6",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Total
                </Text>
                <Text style={{}}>
                  {numsDay ? data?.price * numRooms * numsDay + 15 : "0"}
                </Text>
              </View>
            </View>
            {user ? (
              <Pressable
                style={{
                  backgroundColor: numsDay&&!loading ? "#ff385c" : "#d2d2d2",
                  borderRadius: 10,
                  padding: 8,
                  width: 280,
                  marginTop: 20,
                }}
                onPress={handleBook}
              >
                {loading ? (
                  <ActivityIndicator size={"small"} color="gray" />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    Booking
                  </Text>
                )}
              </Pressable>
            ) : (
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 20,
                  width: "80%",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  Login or sign up to book
                </Text>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingTop: 20,
                  }}
                >
                  <Pressable
                    style={{
                      width: "70%",
                    }}
                    onPress={() => {
                      router.push("root/authen/login");
                      hidden();
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "white",
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        backgroundColor: "#ff385c",
                        borderRadius: 20,
                        textAlign: "center",
                      }}
                    >
                      Go to login
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingTop: 10,
                  }}
                >
                  <Pressable
                    style={{
                      width: "70%",
                    }}
                    onPress={() => {
                      hidden();
                      router.push("root/authen/register");
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        textAlign: "center",
                        borderWidth: 1,
                        borderColor: "#ff385c",
                        color: "#ff385c",
                      }}
                    >
                      Sign up
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 100,
                width: "100%",
                alignItems: "center",
              }}
            ></View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};
