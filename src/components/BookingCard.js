import { format } from "date-fns";
import { router } from "expo-router";
import { memo } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { CheckReview } from "./Reviews";
import TimeLeft from "./TimeLeft";
import Image from "./Image";
import ImageAvt from "./ImageAvt";
export default memo(({ data, setAction, setPaymentData, setBookingId }) => {
  const w = useWindowDimensions().width;
  const handleButtonClick = () => {
    if (!data?.isPaid) {
      setPaymentData(data);
    }
  };
  const handleCancelBooking = () => {
    if (data?.status === "Pending" || data?.status === "Confirmed") {
      setAction("cancel-booking");
      setBookingId(data?.id);
    }
  };
  const handleRemoveRequestCancel = () => {
    if (data?.status === "RequestCancel") {
      setAction("remove-cancel");
      setBookingId(data?.id);
    }
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 4,
        borderRadius: 2,
        paddingHorizontal: 5,
        paddingVertical: 8,
      }}
    >
      <Pressable
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        onPress={() => {
          router.push(`root/mytrip/${data?.id}`);
        }}
      />
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
          src={data?.accommodation.mod?.avatar}
          style={{
            width: 24,
            height: 24,
            borderRadius: 20,
          }}
          transition={0}
        />
        <Text
          style={{
            fontWeight: "500",
            marginLeft: 4,
            fontSize: 15,
          }}
        >
          {data?.accommodation.mod?.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
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
        <View>
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
      </View>

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
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onPress={() => {
            router.push(`root/mytrip/${data?.id}`);
          }}
        />

        {data?.status !== "RequestCancel" &&
          data?.status !== "Canceled" &&
          data?.status !== "Completed" && (
            <Pressable
              style={{
                marginLeft: 20,
                paddingVertical: 8,
                alignItems: "center",
                width: 100,
                backgroundColor: data?.isPaid ? "#cccccc" : "#ff385c",
                borderRadius: 4,
                marginBottom: 4,
                zIndex: 4,
              }}
              onPress={handleButtonClick}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {data?.isPaid ? "Paid" : "Pay"}
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

      {data?.status === "RequestCancel" && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 4,
            flexDirection: "row",
            zIndex: 2,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "84%",
              backgroundColor: "#d7d7d7",
              borderRadius: 4,
            }}
            onPress={handleRemoveRequestCancel}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "500",
              }}
            >
              Remove request
            </Text>
          </Pressable>
        </View>
      )}
      {(data?.status === "Pending" || data?.status === "Confirmed") && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 4,
            flexDirection: "row",
            zIndex: 2,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "84%",
              backgroundColor: "#d7d7d7",
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
        </View>
      )}
      {data?.status === "Completed" && (
        <CheckReview postId={data?.accommodation?.id} />
      )}
    </View>
  );
});
