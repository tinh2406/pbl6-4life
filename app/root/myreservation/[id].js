import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import TimeLeft from "../../../src/components/TimeLeft";
import { format } from "date-fns";
import { memo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "react-query";
import ModalPrompt from "../../../src/components/ModalPrompt";
import { instance } from "../../../src/context/AuthContext";
import { calcNumDays } from "../../../src/utils/CalcNumdays";
import Image from "../../../src/components/Image";
import ImageAvt from "../../../src/components/ImageAvt";
export default () => {
  const { id } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fcfcfc",
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
            marginLeft: 20,
          }}
        >
          Booking info
        </Text>
      </View>
      <ScrollView>
        <Content id={id} />
      </ScrollView>
    </View>
  );
};

const titleMapper = {
  RequestCancel: "want cancel their booking",
  Canceled: "has canceled their booking",
};
const actionsMapper = {
  "mark-as-paid": "This booking has paid?",
  "cancel-booking": "This booking has canceled?",
  "confirm-booking": "This booking has confirmed?",
  "refuse-cancel": "Refusing to cancel this booking?",
};
const apisMapper = {
  "mark-as-paid": "api/bookings/mark-as-paid/",
  "cancel-booking": "api/bookings/approve-cancel/",
  "confirm-booking": "api/bookings/confirm-booking/",
  "refuse-cancel": "api/bookings/reject-cancel/",
};

const Content = memo(({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["myreservation", id],
    queryFn: async () => {
      const res = await instance.get(`/api/bookings/${id}`);
      return res.data;
    },
  });
  const w = useWindowDimensions().width;
  const queryClient = useQueryClient();
  const [action, setAction] = useState();

  const handleButtonClick = () => {
    if (!data?.isPaid) {
      setAction("mark-as-paid");
    }
  };
  const handleCancelBooking = () => {
    setAction("cancel-booking");
  };
  const handleConfirmBooking = () => {
    if (data?.status === "Pending") {
      setAction("confirm-booking");
    }
  };
  const handleRefusCancel = () => {
    if (data?.status === "RequestCancel") {
      setAction("refuse-cancel");
    }
  };

  if (isLoading)
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#ff385c" />
      </View>
    );
  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 4,
        borderRadius: 2,
        paddingHorizontal: 5,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginBottom: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ImageAvt
          src={data?.userSummaryDto?.avatar}
          style={{
            width: 24,
            height: 24,
            borderRadius: 20,
          }}
        />
        <Text
          style={{
            fontWeight: "500",
            marginLeft: 4,
            fontSize: 15,
          }}
        >
          {data?.userSummaryDto?.name}
        </Text>
        <Text
          style={{
            marginLeft: 4,
            fontSize: 14,
            fontWeight: "500",
            color: "#5a5a5a",
          }}
        >
          {titleMapper[data?.status] || "has booked your room"}
        </Text>
      </View>
      <Pressable
        style={{
          flexDirection: "row",
          backgroundColor: "#e4e4e4",
          borderRadius: 6,
          padding: 10,
          margin: 10,
        }}
        onPress={() => {
          // router.push(`root/accommodation/${data?.accommodation.id}`);
        }}
      >
        <Image
          src={data?.accommodation.imageUrls[0]}
          style={{
            width: 100,
            height: 100,
            borderRadius: 4,
            margin: 6,
          }}
        />
        <View
          style={{
            width: w - 40,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {data?.accommodation.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: w - 130,
              fontSize: 13,
              color: "#494949",
              height: 40,
            }}
          >
            {data?.accommodation.address}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          marginBottom: 10,
          marginLeft: 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Date & Time
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          From:{" "}
          {data?.checkInDate &&
            format(Date.parse(data?.checkInDate), "MMMM do yyyy")}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          To:{" "}
          {data?.checkOutDate &&
            format(Date.parse(data?.checkOutDate), "MMMM do yyyy")}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#eeeeee",
          marginBottom: 5,
        }}
      />
      <View
        style={{
          marginBottom: 20,
          marginLeft: 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Customer info
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Name: {data?.userSummaryDto.name}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Phone: {data?.userSummaryDto?.phoneNumber}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Email: {data?.userSummaryDto?.email}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#d1d1d1",
          marginBottom: 5,
        }}
      />
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#494949",
            marginLeft: 4,
          }}
        >
          Created at:{" "}
          {data?.createdDate &&
            format(Date.parse(data?.createdDate), "dd-MM-yyyy")}
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Price per night:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              ${data?.accommodation.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Num of days:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              {calcNumDays(
                Date.parse(data?.checkInDate),
                Date.parse(data?.checkOutDate)
              )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Fee:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              ${15}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              ${data?.totalPrice}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <TimeLeft
          checkInDate={data?.checkInDate}
          checkOutDate={data?.checkOutDate}
          isPaid={data?.isPaid}
          status={data?.status}
        />
        {data?.status !== "RequestCancel" && data?.status !== "Canceled" && (
          <Pressable
            style={{
              marginLeft: 20,
              paddingVertical: 8,
              alignItems: "center",
              width: 100,
              backgroundColor: data?.isPaid ? "#7d7d7d" : "#0e9639",
              borderRadius: 4,
            }}
            onPress={handleButtonClick}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
              }}
            >
              {data?.isPaid ? "Paid" : "Confirm paid"}
            </Text>
          </Pressable>
        )}
      </View>
      {data?.status === "Pending" && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "48%",
              backgroundColor: "#d2d2d2",
              borderRadius: 4,
            }}
            onPress={handleCancelBooking}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "500",
              }}
            >
              Cancel booking
            </Text>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "48%",
              backgroundColor: "#ff385c",
              borderRadius: 4,
              marginLeft: 20,
            }}
            onPress={handleConfirmBooking}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
              }}
            >
              Confirm booking
            </Text>
          </Pressable>
        </View>
      )}
      {data?.status === "RequestCancel" && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "48%",
              backgroundColor: "#d4e51c",
              borderRadius: 4,
            }}
            onPress={handleRefusCancel}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "500",
              }}
            >
              Refused to cancel
            </Text>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "48%",
              backgroundColor: "#d7700f",
              borderRadius: 4,
              marginLeft: 20,
            }}
            onPress={handleCancelBooking}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
              }}
            >
              Accept cancellation
            </Text>
          </Pressable>
        </View>
      )}
      <ModalPrompt
        title="Comfirm"
        message={actionsMapper[action] || "This booking has paid?"}
        visible={!!action}
        onCancel={() => setAction()}
        onConfirm={async () => {
          if (id) {
            if (action) {
              try {
                await instance.post(`${apisMapper[action]}${id}`);
                queryClient.invalidateQueries(["myreservation", id]);
              } catch (error) {
                console.log(error.response);
                toast.show(`Error: ${error.message}`, {
                  type: "danger",
                  placement: "top",
                });
              }
            }
          }
        }}
      />
    </View>
  );
});
