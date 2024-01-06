import { format } from "date-fns";
import { memo } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import TimeLeft from "./TimeLeft";
import Image from "./Image";
import { router } from "expo-router";
import ImageAvt from "./ImageAvt";

const titleMapper = {
  RequestCancel: "want cancel their booking",
  Canceled: "has canceled their booking",
};

export default memo(({ data, setAction, setBookingId }) => {
  const w = useWindowDimensions().width;
  const handleButtonClick = () => {
    if (data?.isPaid) {
    } else {
      setAction("mark-as-paid");
      setBookingId(data.id);
    }
  };
  const handleRejectBooking = () => {
    setAction("reject-booking");
    setBookingId(data.id);
  };
  const handleCancelBooking = () => {
    setAction("cancel-booking");
    setBookingId(data.id);
  };
  const handleConfirmBooking = () => {
    if (data?.status === "Pending") {
      setAction("confirm-booking");
      setBookingId(data.id);
    }
  };
  const handleRefusCancel = () => {
    if (data?.status === "RequestCancel") {
      setAction("refuse-cancel");
      setBookingId(data.id);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 4,
        borderRadius: 2,
        paddingHorizontal: 5,
        paddingVertical: 5,
        paddingBottom: 8,
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
          router.push(`root/myreservation/${data?.id}`);
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
            width: w - 150,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {data?.accommodation.name} {data?.status}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              width: w - 160,
              fontSize: 13,
              color: "#494949",
              height: 40,
            }}
          >
            {data?.accommodation.address}
          </Text>
          <Text
            style={{
              width: "100%",
              fontSize: 13,
              color: "#494949",
            }}
          >
            From:{format(Date.parse(data?.checkInDate), "dd-MM-yyyy")} To:
            {format(Date.parse(data?.checkOutDate), "dd-MM-yyyy")}
          </Text>
        </View>
      </Pressable>

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
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
          Created at: {format(Date.parse(data?.createdDate), "dd-MM-yyyy")}
        </Text>
        <View
          style={{
            flexDirection: "row",
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
      <View
        style={{
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {data?.status !== "RequestCancel" && data?.status !== "Canceled" && (
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: 100,
              backgroundColor: data?.isPaid ? "#7d7d7d" : "#0e9639",
              borderRadius: 4,
              marginLeft: 20,
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
        <TimeLeft
          checkInDate={data?.checkInDate}
          checkOutDate={data?.checkOutDate}
          isPaid={data?.isPaid}
          status={data?.status}
        />
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
            onPress={handleRejectBooking}
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
    </View>
  );
});
