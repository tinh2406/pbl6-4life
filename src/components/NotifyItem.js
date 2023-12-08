import { format } from "date-fns";
import { memo } from "react";
import { Text, View } from "react-native";
import { useNotify } from "../context/NotifyContext";

const RequestModNotify = ({ content }) => {
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
      <Text>
        {content}
      </Text>
    </View>
  );
};
const BookingNotify = ({ content }) => {
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
      <Text>
        {content}
      </Text>
    </View>
  );
};
const PaymentNotify = ({ content }) => {
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
      <Text>
        {content}
      </Text>
    </View>
  );
};

const NotifyItem = ({ data }) => {
  const {last} = useNotify()

  return (
    <View
      style={{
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: last<data?.createdDate?"white":"#f2f2f2",
        borderBottomWidth: 1,
        borderBottomColor: "#dcdcdc",
      }}
    >
      {data?.type === "RequestToMod" && (
        <RequestModNotify content={data?.content} />
      )}
      {data?.type === "Booking" && <BookingNotify content={data?.content} />}
      {data?.type === "Payment" && <PaymentNotify content={data?.content} />}
      <Text
        style={{
          fontSize: 10,
          fontWeight: "300",
          textAlign: "right",
        }}
      >
        {data?.createdDate && format(Date.parse(data?.createdDate), "hh:mm dd-MM-yyyy")}
      </Text>
    </View>
  );
};
export default memo(NotifyItem);
