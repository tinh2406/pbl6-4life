import { format } from "date-fns";
import { memo, useEffect } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { useNotify } from "../context/NotifyContext";
import { router } from "expo-router";
import Image from "./Image";

const RequestModNotify = ({ img, content }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 15,
        }}
      >
        Request to mod
      </Text>
      <Text>{content}</Text>
    </View>
  );
};
const BookingNotify = ({ img, content }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 15,
        }}
      >
        Booking successfully
      </Text>
      <Text>{content}</Text>
    </View>
  );
};
const PaymentNotify = ({ img, content }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 15,
        }}
      >
        Paid successfully
      </Text>
      <Text>{content}</Text>
    </View>
  );
};

const NotifyItem = memo(({ data }) => {
  const { newNoti, removeNoti, last, addNoti, setHasNew, updateLast } =
    useNotify();
  const w = useWindowDimensions().width;

  useEffect(() => {
    try {
      if (
        data?.id &&
        data?.createdDate &&
        Date.parse(data?.createdDate) > Number.parseInt(last)
      ) {
        addNoti(data?.id);
      }
    } catch (error) {}
  }, []);

  return (
    <Pressable
      style={{
        flexDirection: "row",
        padding: 8,
        backgroundColor: newNoti.includes(data?.id) ? "#e0f6ff" : "transparent",
      }}
      onPress={() => {
        if (newNoti.includes(data?.id)) removeNoti(data?.id);
        updateLast();
        if (data?.type === "Booking" || data?.type === "Payment") {
          if (
            data?.content.includes("has booked your") ||
            data?.content.includes("has paid")
          )
            router.push(
              `root/myreservation/${data?.note.replace("Booking Id: ", "")}`
            );
          else if (
            data?.content.includes("You have booked") ||
            data?.content.includes("You have paid")
          )
            router.push(
              `root/mytrip/${data?.note.replace("Booking Id: ", "")}`
            );
        }
      }}
    >
      <Image
        src={data?.avatar}
        alt="Noti"
        style={{
          margin: 8,
          borderRadius: 50,
          width: 50,
          height: 50,
        }}
      />
      <View
        style={{
          width: w - 90,
        }}
      >
        {data?.type === "RequestToMod" && (
          <RequestModNotify img={data?.avatar} content={data?.content} />
        )}
        {data?.type === "Booking" && (
          <BookingNotify img={data?.avatar} content={data?.content} />
        )}
        {data?.type === "Payment" && (
          <PaymentNotify img={data?.avatar} content={data?.content} />
        )}
        <Text
          style={{
            fontSize: 10,
            fontWeight: "300",
            textAlign: "right",
          }}
        >
          {data?.createdDate &&
            format(Date.parse(data?.createdDate), "hh:mm dd-MM-yyyy")}
        </Text>
      </View>
    </Pressable>
  );
});

export default NotifyItem;
