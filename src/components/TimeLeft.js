import { memo, useMemo } from "react";
import { Text, View } from "react-native";
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
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              minWidth: 100,
              flexDirection: "row",
              alignItems: "center",
              color: "white",
              fontWeight: "500",
            }}
          >
            <View
              style={{
                backgroundColor: "#ff004c",
                width: 12,
                height: 12,
                borderRadius: 10,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {status === "Canceled" ? "Canceled" : "Waiting for cancel"}
            </Text>
          </View>
        ))}
      {status === "Pending" && (
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            minWidth: 100,
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          <View
            style={{
              backgroundColor: "#d4a01b",
              width: 12,
              height: 12,
              borderRadius: 10,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Pending
          </Text>
        </View>
      )}
      {status === "Confirmed" && checkin > now && (
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            minWidth: 100,
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          <View
            style={{
              backgroundColor:
                calcNumDays(now, checkin) > 2 ? "#179f13" : "#cf7800",
              width: 12,
              height: 12,
              borderRadius: 10,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Time left {calcNumDays(now, checkin)} day(s)
          </Text>
        </View>
      )}
      {checkin < now && checkout > now && status === "CheckedIn" && (
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            minWidth: 100,
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          <View
            style={{
              backgroundColor: "#179f13",
              width: 12,
              height: 12,
              borderRadius: 10,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Ongoing
          </Text>
        </View>
      )}
      {status === "Completed" && checkout < now && isPaid && (
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            minWidth: 100,
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            fontWeight: "500",
          }}
        >
          <View
            style={{
              backgroundColor: "#2c9751",
              width: 12,
              height: 12,
              borderRadius: 10,
              marginRight: 8,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Completed
          </Text>
        </View>
      )}
    </>
  );
});
