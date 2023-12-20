import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import TimeLeft from "../../../src/components/TimeLeft";
import { format } from "date-fns";
import { memo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "react-query";
import defaultAvt from "../../../src/assets/defaultAvatar.png";
import ModalPrompt from "../../../src/components/ModalPrompt";
import { instance } from "../../../src/context/AuthContext";
import { calcNumDays } from "../../../src/utils/CalcNumdays";
export default () => {
  const { id } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fcfcfc",
      }}
    >
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={"#6b6b6b"}
          onPress={() => {
            router.back();
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            flexGrow: 1,
            marginLeft: 20,
          }}
        >
          Booking info
        </Text>
      </View>
      <ScrollView>
        <Content id={id} />
      </ScrollView>
    </View>
  );
};

const Content = memo(({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["myreservation", id],
    queryFn: async () => {
      const res = await instance.get(`/api/bookings/${id}`);
      return res.data;
    },
  });
  const w = useWindowDimensions().width;
  const queryClient = useQueryClient();
  const [modalConfirm, setModalConfirm] = useState(false);
  const handleButtonClick = () => {
    if (data?.isPaid) {
    } else {
      setModalConfirm(true);
    }
  };
  if (isLoading)
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#ff385c" />
      </View>
    );
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
          // router.push(`root/accommodation/${data?.accommodation.id}`);
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
              width: w - 130,
              fontSize: 13,
              color: "#494949",
              height: 40,
            }}
          >
            {data?.accommodation.address}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          marginBottom: 10,
          marginLeft: 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Date & Time
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          From:{" "}
          {data?.checkInDate &&
            format(Date.parse(data?.checkInDate), "MMMM do yyyy")}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          To:{" "}
          {data?.checkOutDate &&
            format(Date.parse(data?.checkOutDate), "MMMM do yyyy")}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#eeeeee",
          marginBottom: 5,
        }}
      />
      <View
        style={{
          marginBottom: 20,
          marginLeft: 4,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Customer info
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Name: {data?.userSummaryDto.name}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Phone: {data?.userSummaryDto?.phoneNumber}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Email: {data?.userSummaryDto?.email}
        </Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#d1d1d1",
          marginBottom: 5,
        }}
      />
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
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
          Created at:{" "}
          {data?.createdDate &&
            format(Date.parse(data?.createdDate), "dd-MM-yyyy")}
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Price per night:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              {data?.accommodation.price}đ
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Num of days:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              {calcNumDays(
                Date.parse(data?.checkInDate),
                Date.parse(data?.checkOutDate)
              )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "black",
              }}
            >
              Fee:
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                fontWeight: "500",
                marginLeft: 2,
              }}
            >
              {15}đ
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
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
            marginLeft: 20,
            paddingVertical: 8,
            alignItems: "center",
            width: 100,
            backgroundColor: data?.isPaid ? "#7d7d7d" : "#0e9639",
            borderRadius: 4,
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
      <ModalPrompt
        title="Comfirm"
        message="This booking has paid?"
        visible={modalConfirm}
        onCancel={() => setModalConfirm(false)}
        onConfirm={async () => {
          if (bookingId) {
            if (action === "mark-as-paid") {
              try {
                await instance.post(`api/bookings/mark-as-paid/${id}`);
                queryClient.invalidateQueries(["myreservation", id]);
              } catch (error) {
                console.log(error.response);
                toast.show(`Error: ${error.message}`, {
                  type: "danger",
                  placement: "top",
                });
              }
            }
          }
        }}
      />
    </View>
  );
});
