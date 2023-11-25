import { memo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import defaultAvt from "../assets/defaultAvatar.png";
import { format } from "date-fns";
import { router } from "expo-router";
import ModalPayment from "./ModalPayment";
export default memo(({ data }) => {
    const [modalPaymentShow,setModalPaymentShow] = useState(false);
    const handleButtonClick = ()=>{
        if(data?.isPaid){

        }
        else{
            setModalPaymentShow(true);
        }
    }

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
          marginLeft:5
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
        onPress={()=>{
            router.push(`root/booking/${data?.id}`)
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
          <Text
            style={{
              width: "100%",
              fontSize: 13,
              color: "#494949",
            }}
          >
            From:{format(Date.parse(data?.checkInDate), "dd-MM-yyyy")}{" "}
            To:{format(Date.parse(data?.checkOutDate), "dd-MM-yyyy")}
          </Text>
        </View>
      </Pressable>

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
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
        <View
          style={{
            flexDirection: "row",
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
