import { memo, useMemo } from "react";
import { Text } from "react-native";
import { calcNumDays } from "../utils/CalcNumdays";

export default memo(({ checkInDate, checkOutDate, isPaid, status }) => {
  
  if (!checkInDate || !checkOutDate) return <></>;
  const checkin = useMemo(() => {
    return Date.parse(checkInDate);
  }, [checkInDate]);
  const checkout = useMemo(() => {
    return Date.parse(checkOutDate);
  }, [checkOutDate]);
  const now = Date.now();
  return (
    <>
      {status === "RequestCancel" ||
        (status === "Canceled" && (
          <Text
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              textAlign: "center",
              minWidth: 100,
              backgroundColor: "#d6d6d6",
              borderRadius: 4,
              color: "black",
              fontWeight: "500",
            }}
          >
            {status === "Canceled" ? "Canceled" : "Waiting for cancel"}
          </Text>
        ))}
      {status === "Pending" && (
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            textAlign: "center",
            minWidth: 100,
            backgroundColor: "#d4a01b",
            borderRadius: 4,
            color: "white",
            fontWeight: "500",
          }}
        >
          Pending
        </Text>
      )}
      {status === "Confirmed" && checkin > now && (
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            textAlign: "center",
            minWidth: 100,
            backgroundColor:
              calcNumDays(now, checkin) > 2 ? "#179f13" : "#cf7800",
            borderRadius: 4,
            color: "white",
            fontWeight: "500",
          }}
        >
          Time left {calcNumDays(now, checkin)} day(s)
        </Text>
      )}
      {checkin < now && checkout > now && status === "CheckedIn" && (
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            textAlign: "center",
            minWidth: 100,
            backgroundColor: "#179f13",
            borderRadius: 4,
            color: "white",
            fontWeight: "500",
          }}
        >
          Ongoing
        </Text>
      )}
      {status === "Completed" && checkout < now && isPaid && (
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            textAlign: "center",
            minWidth: 100,
            backgroundColor: "#2c9751",
            borderRadius: 4,
            color: "white",
            fontWeight: "500",
          }}
        >
          Completed
        </Text>
      )}
    </>
  );
});
