import { memo, useMemo } from "react";
import { Text } from "react-native";
import { calcNumDays } from "../utils/CalcNumdays";

export default memo(({ checkInDate, checkOutDate,isPaid }) => {
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
      {checkin > now ? (
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            textAlign: "right",
            backgroundColor:
              calcNumDays(now, checkin) > 2 ? "#179f13" : "#cf7800",
            borderRadius: 4,
            color: "white",
            fontWeight: "500",
          }}
        >
          Time left {calcNumDays(now, checkin)} day(s)
        </Text>
      ) : checkin < now && checkout > now ? (
        <Text
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            textAlign: "right",
            backgroundColor: "#179f13",
            borderRadius: 4,
            color: "white",
            fontWeight: "500",
          }}
        >
          Ongoing
        </Text>
      ) : (
        checkout < now &&
        isPaid && (
          <Text
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              textAlign: "right",
              backgroundColor: "#2c9751",
              borderRadius: 4,
              color: "white",
              fontWeight: "500",
            }}
          >
            Wait for review
          </Text>
        )
      )}
    </>
  );
});
