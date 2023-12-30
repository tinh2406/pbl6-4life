import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { instance } from "../../../src/context/AuthContext";
import { memo, useState } from "react";
import { format } from "date-fns";
import ModalPayment from "../../../src/components/ModalPayment";
import { calcNumDays } from "../../../src/utils/CalcNumdays";
import { CheckReview } from "../../../src/components/Reviews";
import TimeLeft from "../../../src/components/TimeLeft";
import Image from "../../../src/components/Image";
import ModalPrompt from "../../../src/components/ModalPrompt";
import ImageAvt from "../../../src/components/ImageAvt";
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
const apisMapper = {
  "remove-cancel": "api/bookings/revoke-cancel-booking-request",
  "cancel-booking": "api/bookings/request-cancel",
};
const messagesMapper = {
  "remove-cancel": "Remove this request?",
  "cancel-booking": "Do you want cancel this booking?",
};
const Content = memo(({ id }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await instance.get(`/api/bookings/${id}`);
      return res.data;
    },
  });
  const w = useWindowDimensions().width;

  const [modalPaymentShow, setModalPaymentShow] = useState(false);
  const [action, setAction] = useState();

  const handleButtonClick = () => {
    if (data?.isPaid) {
    } else {
      setModalPaymentShow(true);
    }
  };
  const handleCancelBooking = () => {
    if (data?.status === "Pending" || data?.status === "Confirmed") {
      setAction("cancel-booking");
    }
  };
  const handleRemoveRequestCancel = () => {
    if (data?.status === "RequestCancel") {
      setAction("remove-cancel");
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
          marginBottom: 4,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ImageAvt
          src={data?.accommodation.mod?.avatar}
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
          {data?.accommodation.mod?.name}
        </Text>
      </View>
      <Pressable
        style={{
          flexDirection: "row",
        }}
        onPress={() => {
          router.push(`root/accommodation/${data?.accommodation.id}`);
        }}
      >
        <Image
          src={data?.accommodation.imageUrls[0]}
          style={{
            width: 100,
            height: 100,
            borderRadius: 4,
            margin: 6,
          }}
        />
        <View>
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
          Accommodation info
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Address: {data?.accommodation.address}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Phone: {data?.accommodation.mod?.phoneNumber}
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
          alignItems: "flex-end",
          marginTop: 10,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onPress={() => {
            router.push(`root/mytrip/${data?.id}`);
          }}
        />
        {data?.status !== "RequestCancel" &&
          data?.status !== "Canceled" &&
          data?.status !== "Completed" && (
            <Pressable
              style={{
                marginLeft: 20,
                paddingVertical: 8,
                alignItems: "center",
                width: 100,
                backgroundColor: data?.isPaid ? "#cccccc" : "#ff385c",
                borderRadius: 4,
                marginBottom: 4,
                zIndex: 4,
              }}
              onPress={handleButtonClick}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {data?.isPaid ? "Paid" : "Pay"}
              </Text>
            </Pressable>
          )}
        <TimeLeft
          checkInDate={data?.checkInDate}
          checkOutDate={data?.checkOutDate}
          isPaid={data?.isPaid}
          status={data?.status}
        />
      </View>
      {data?.status === "RequestCancel" && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 4,
            flexDirection: "row",
            zIndex: 2,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "84%",
              backgroundColor: "#d7d7d7",
              borderRadius: 4,
            }}
            onPress={handleRemoveRequestCancel}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "500",
              }}
            >
              Remove request
            </Text>
          </Pressable>
        </View>
      )}
      {(data?.status === "Pending" || data?.status === "Confirmed") && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 4,
            flexDirection: "row",
            zIndex: 2,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 8,
              alignItems: "center",
              width: "84%",
              backgroundColor: "#d7d7d7",
              borderRadius: 4,
            }}
            onPress={handleCancelBooking}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "500",
              }}
            >
              Cancel booking
            </Text>
          </Pressable>
        </View>
      )}
      {data?.status === "Completed" && (
        <CheckReview postId={data?.accommodation?.id} />
      )}
      <ModalPayment
        data={data}
        visible={modalPaymentShow}
        onConfirm={() => {}}
        hidden={() => {
          setModalPaymentShow(false);
        }}
      />
      <ModalPrompt
        title="Comfirm"
        message={messagesMapper[action]}
        visible={!!action}
        onCancel={() => setAction()}
        onConfirm={async () => {
          if (action && id) {
            try {
              await instance.post(`${apisMapper[action]}${id}`);
              queryClient.invalidateQueries(["bookings"]);
            } catch (error) {
              console.log(error.response);
              toast.show(`Error: ${error.message}`, {
                type: "danger",
                placement: "top",
              });
            }
          }
        }}
      />
    </View>
  );
});
