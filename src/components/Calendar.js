import { memo, useMemo, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { useQuery } from "react-query";
import { instance } from "../context/AuthContext";

export default memo(({ id }) => {
  const w = useWindowDimensions().width;
  const [selectedTime, setSelectedTime] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  

  const { data } = useQuery({
    queryKey: ["calendar", id, ...Object.values(selectedTime)],
    queryFn: async () => {
      try {
        const res = await instance.get(
          `/api/accommodations/availability-calendar/${id}`,
          {
            params: {
              Month: selectedTime.month,
              Year: selectedTime.year,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.log(JSON.stringify(error));
        return { days: [] };
      }
    },
  });

  
  const markedDates = useMemo(() => {
    const busyDays = {};
    if (data) {
      data.days.forEach((day) => {
        if (!day.bookable)
          busyDays[
            `${selectedTime.year}-${selectedTime.month < 10 ? "0" : ""}${
              selectedTime.month
            }-${day.day < 10 ? "0" : ""}${day.day}`
          ] = {
            selected: true,
            selectedColor: "#838383",
          };
      });
    }
    return busyDays;
  }, [data, selectedTime]);
  

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: "#d5d5d5",
      }}
    >
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          fontSize: 18,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        Availability
      </Text>
      <Calendar
        style={{
          borderColor: "gray",
          height: 400,
          width: w,
        }}
        // current={``}
        onMonthChange={(e) => {
          setSelectedTime({ month: e.month, year: e.year });
        }}
        markedDates={markedDates}
      />
    </View>
  );
});
