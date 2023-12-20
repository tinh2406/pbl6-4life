import { memo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { formatMeetBE, formatToFE } from "../utils/formatTime";

export const TimeCheckIn = memo(({ value, setValue, error }) => {
  const [beforeVisible, setBeforeVisible] = useState(false);
  const [afterVisible, setAfterVisible] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Time checkin:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              setAfterVisible(true);
            }}
            style={{
              width: 70,
              padding: 6,
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
              marginRight: 5,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {value?.after ? formatToFE(value.after) : "Select"}
            </Text>
          </Pressable>
          <Text style={{ fontSize: 20 }}>-</Text>
          <Pressable
            onPress={() => {
              setBeforeVisible(true);
            }}
            style={{
              marginLeft: 5,
              width: 70,
              padding: 6,
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {value?.before ? formatToFE(value.before) : "Select"}
            </Text>
          </Pressable>
        </View>
        <TimePickerModal
          animationType="fade"
          visible={beforeVisible}
          hours={value?.before ? Number(value.before.split(":")[0]) : 12}
          minutes={value?.before ? Number(value.before.split(":")[1]) : 0}
          onConfirm={(time) => {
            setValue({
              ...value,
              before: formatMeetBE({ hour: time.hours, minute: time.minutes }),
            });
            setBeforeVisible(false);
          }}
          onDismiss={() => {
            setBeforeVisible(false);
          }}
        />
        <TimePickerModal
          animationType="fade"
          hours={value?.after ? Number(value.after.split(":")[0]) : 12}
          minutes={value?.after ? Number(value.after.split(":")[1]) : 0}
          visible={afterVisible}
          onConfirm={(time) => {
            setValue({
              ...value,
              after: formatMeetBE({ hour: time.hours, minute: time.minutes }),
            });
            setAfterVisible(false);
          }}
          onDismiss={() => {
            setAfterVisible(false);
          }}
        />
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
});

export const TimeCheckOut = memo(({ value, setValue, error }) => {
  const [pickVisible, setPickVisible] = useState(false);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Time checkout:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              setPickVisible(true);
            }}
            style={{
              width: 70,
              padding: 6,
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {value ? formatToFE(value) : "Select"}
            </Text>
          </Pressable>
        </View>
        <TimePickerModal
          animationType="fade"
          visible={pickVisible}
          hours={value ? Number(value.split(":")[0]) : 12}
          minutes={value ? Number(value.split(":")[1]) : 0}
          
          onConfirm={(time) => {
            setValue(formatMeetBE({ hour: time.hours, minute: time.minutes }));
            setPickVisible(false);
          }}
          onDismiss={() => {
            setPickVisible(false);
          }}
        />
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
});

export const QuietTime = memo(({ value, setValue, error }) => {
  const [beforeVisible, setBeforeVisible] = useState(false);
  const [afterVisible, setAfterVisible] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Quiet time:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              setAfterVisible(true);
            }}
            style={{
              width: 70,
              padding: 6,
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
              marginRight: 5,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {value?.after ? formatToFE(value.after) : "Select"}
            </Text>
          </Pressable>
          <Text style={{ fontSize: 20 }}>-</Text>
          <Pressable
            onPress={() => {
              setBeforeVisible(true);
            }}
            style={{
              marginLeft: 5,
              width: 70,
              padding: 6,
              borderRadius: 10,
              backgroundColor: "#e4e4e4",
            }}
          >
            <Text style={{ textAlign: "center" }}>
              {value?.before ? formatToFE(value.before) : "Select"}
            </Text>
          </Pressable>
        </View>
        <TimePickerModal
          animationType="fade"
          visible={beforeVisible}
          hours={value?.before ? Number(value.before.split(":")[0]) : 12}
          minutes={value?.before ? Number(value.before.split(":")[1]) : 0}
          onConfirm={(time) => {
            setValue({
              ...value,
              before: formatMeetBE({ hour: time.hours, minute: time.minutes }),
            });
            setBeforeVisible(false);
          }}
          onDismiss={() => {
            setBeforeVisible(false);
          }}
        />
        <TimePickerModal
          animationType="fade"
          visible={afterVisible}
          hours={value?.after ? Number(value.after.split(":")[0]) : 12}
          minutes={value?.after ? Number(value.after.split(":")[1]) : 0}
          onConfirm={(time) => {
            setValue({
              ...value,
              after: formatMeetBE({ hour: time.hours, minute: time.minutes }),
            });
            setAfterVisible(false);
          }}
          onDismiss={() => {
            setAfterVisible(false);
          }}
        />
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
});

export const Allow = memo(({ title, value, setValue }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          textDecorationLine: !value ? "line-through" : "none",
          fontSize: 15,
        }}
      >
        {title}
      </Text>
      <Checkbox
        onPress={() => {
          setValue(!value);
        }}
        status={value ? "checked" : "unchecked"}
        color="#000"
      />
    </View>
  );
});
