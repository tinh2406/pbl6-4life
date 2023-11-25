import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { instance } from "../../../src/context/AuthContext";
import { memo, useState } from "react";
import defaultAvt from "../../../src/assets/defaultAvatar.png";
import { format } from "date-fns";
import ModalPayment from "../../../src/components/ModalPayment";
import { callNumDays } from "../../../src/utils/CallNumdays";
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
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await instance.get(`/api/bookings/${id}`);
      return res.data;
    },
  });

  const [modalPaymentShow, setModalPaymentShow] = useState(false);
  const handleButtonClick = () => {
    if (data?.isPaid) {
    } else {
      setModalPaymentShow(true);
    }
  };
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
          marginLeft: 5,
        }}
      >
        <Image
          source={
            data?.accommodation.mod?.avatar
              ? {
                  uri: data?.accommodation.mod?.avatar,
                }
              : defaultAvt
          }
          style={{
            width: 24,
            height: 24,
            borderRadius: 20,
          }}
        />
        <Text>{data?.accommodation.mod?.name}</Text>
      </View>
      <Pressable
        style={{
          flexDirection: "row",
        }}
        onPress={() => {
          router.push(`root/rooms/${data?.accommodation.id}`);
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
              width: "99%",
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
          From:{format(Date.parse(data?.checkInDate), "MMMM do yyyy")}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          To:
          {format(Date.parse(data?.checkOutDate), "MMMM do yyyy")}
        </Text>
      </View>
      <View style={{
        height:1,
        backgroundColor: "#d1d1d1",
        marginBottom: 5
      }}/>
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
          Address:{data?.accommodation.address}
        </Text>
        <Text
          style={{
            width: "100%",
            fontSize: 13,
            color: "#494949",
          }}
        >
          Phone:
          {data?.accommodation.mod?.phoneNumber}
        </Text>
      </View>
      <View style={{
        height:2,
        backgroundColor: "#d1d1d1",
        marginBottom: 5
      }}/>
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
          Created at: {format(Date.parse(data?.createdDate), "dd-MM-yyyy")}
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
              {callNumDays(
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
        }}
      >
        <Pressable
          style={{
            paddingVertical: 8,
            alignItems: "center",
            width: 100,
            backgroundColor: "#ff385c",
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
            {data?.isPaid ? "Re booking" : "Pay"}
          </Text>
        </Pressable>
      </View>
      <ModalPayment
        data={data}
        visible={modalPaymentShow}
        onConfirm={() => {}}
        hidden={() => {
          setModalPaymentShow(false);
        }}
      />
    </View>
  );
});
