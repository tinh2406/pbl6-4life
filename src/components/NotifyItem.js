import { format } from "date-fns";
import { memo } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useNotify } from "../context/NotifyContext";

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

const NotifyItem = ({ data }) => {
  const { newNoti, removeNoti } = useNotify();
  const w = useWindowDimensions().width;
  return (
    <Pressable
      style={{
        flexDirection: "row",
        padding: 8,
        backgroundColor: newNoti.has(data?.id) ? "#e0f6ff" : "transparent",
      }}
      onPress={() => {
        if (newNoti.has(data?.id)) removeNoti(data?.id);
      }}
    >
      <Image
        source={{
          uri: data?.avatar,
        }}
        alt="Noti"
        width={50}
        height={50}
        style={{
          margin: 8,
          borderRadius: 50,
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
};
export default memo(NotifyItem);
