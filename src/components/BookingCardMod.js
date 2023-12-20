import { format } from "date-fns";
import { memo } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import defaultAvt from "../assets/defaultAvatar.png";
import TimeLeft from "./TimeLeft";
export default memo(({ data, setAction, setBookingId }) => {
  const w = useWindowDimensions().width;
  const handleButtonClick = async () => {
    if (data?.isPaid) {
    } else {
      setAction("mark-as-paid");
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
        <Image
          source={
            data?.userSummaryDto?.avatar
              ? {
                  uri: data?.userSummaryDto?.avatar,
                }
              : defaultAvt
          }
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
          has booked your room
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
          //   router.push(`root/booking/${data?.id}`);
        }}
      >
        <Image
          source={{
            uri: data?.accommodation.imageUrls[0],
          }}
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
            {data?.totalPrice}đ
          </Text>
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
        />

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
      </View>
    </View>
  );
});
