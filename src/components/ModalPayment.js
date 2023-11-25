import { Ionicons } from "@expo/vector-icons";
import { memo, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Banks from "../utils/Banks";
import { instance } from "../context/AuthContext";
import * as Clipboard from "expo-clipboard";
import qrcode from "qrcode-generator";

export default ({ visible, hidden, onConfirm, data }) => {
  const heightAnim = useSharedValue(0);
  const [url, setUrl] = useState();
  const style = useAnimatedStyle(() => ({
    height: withTiming(heightAnim.value, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    }),
  }));
  useEffect(() => {
    heightAnim.value = visible ? 600 : 200;
  }, [visible]);
  const onClose = () => {
    heightAnim.value = 0;
    setUrl();
    setTimeout(hidden, 10);
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          width: "100%",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onPress={onClose}
        />
        <Animated.View style={[style]}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 5,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Ionicons
                name="close"
                size={18}
                color="#212121"
                onPress={onClose}
                style={{
                  padding: 8,
                  paddingHorizontal: 16,
                }}
              />
            </View>
            <Content
              onClose={onClose}
              onConfirm={onConfirm}
              data={data}
              url={url}
              setUrl={setUrl}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
const Content = memo(({ onClose, onConfirm, data, url, setUrl }) => {
  const [search, setSearch] = useState("");
  const [bank, setBank] = useState();

  const handleOK = async () => {
    try {
      const res = await instance.post("api/payment", {
        bookingId: data?.id,
        amount: data?.totalPrice,
        bankCode: bank.shortName,
        orderDesc: "Chưa biết",
      });
      setUrl(res?.data);
      onConfirm();
    } catch (error) {
      console.log(error.response);
      console.log(error.response.data);
    }
  };
  if (url) {
    const qr = qrcode(16, "L");
    qr.addData(url);
    qr.make();

    return (
      <View
        style={{
          height: 600,
          width: "100%",
          backgroundColor: "white",
          bottom: 10,
          paddingTop: 30,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            marginBottom: 30,
            height: 50,
            fontWeight: "500",
            color: "black",
            textAlign: "center",
          }}
        >
          Go to the URL to pay your order
        </Text>
        <Image
          source={{
            uri: qr.createDataURL(),
          }}
          width={160}
          height={160}
          style={{
            marginBottom: 60,
          }}
        />
        <View
          style={{
            height: 76,
          }}
        >
          <ScrollView horizontal style={{}}>
            <Pressable
              onPress={() => {
                Linking.openURL(url);
              }}
              style={{
                borderRadius: 8,
                backgroundColor: "#e8e8e8",
              }}
            >
              <Text
                style={{
                  padding: 26,
                  fontSize: 16,
                }}
              >
                {url}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              marginTop: 40,
            }}
            onPress={async () => {
              await Clipboard.setStringAsync(url);
              ToastAndroid.show("Copy to clipboard", 500);
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                padding: 12,
                borderRadius: 4,
                backgroundColor: "#e5e5e5",
              }}
            >
              Copy
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <>
      <View
        style={{
          paddingTop: 10,
          width: "90%",
        }}
      >
        <TextInput
          placeholder="Enter your bank"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#e4e4e4",
            marginBottom: 10,
          }}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        // keyboardDismissMode="on-drag"
        style={{
          width: "100%",
          height: 340,
          paddingHorizontal: 20,
        }}
        data={Banks.filter((i) =>
          i.shortName.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => (
          <View>
            <BankItem data={item} select={setBank} />
          </View>
        )}
        keyExtractor={(item, i) => "_" + item.id}
      />
      <View
        style={{
          height: 150,
          borderTopWidth: 2,
          borderTopColor: "#9e9e9e",
          marginHorizontal: 20,
          width: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            paddingTop: 10,
            paddingHorizontal: 16,
          }}
        >
          Your bank
        </Text>
        {bank ? <BankItem data={bank} /> : <View style={{ height: 54 }} />}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: "#d1d1d1",
          }}
        >
          <Pressable onPress={onClose}>
            <Text
              style={{
                fontWeight: "600",
                backgroundColor: "#efefef",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 4,
              }}
            >
              Later
            </Text>
          </Pressable>
          <Pressable onPress={handleOK}>
            <Text
              style={{
                fontWeight: "600",
                color: "white",
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: bank ? "#ff385c" : "#a7a7a7",
                borderRadius: 4,
              }}
            >
              Pay
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
});
const BankItem = memo(({ data, select }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        padding: 12,
        paddingHorizontal: 6,
        alignItems: "center",
        width: "100%",
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 0.2,
      }}
      onPress={() => {
        if (select) select(data);
      }}
    >
      <Image
        source={{
          uri: data.logo,
        }}
        style={{
          height: 30,
          aspectRatio: 2.4,
          borderRadius: 4,
        }}
      />
      <Text
        style={{
          marginLeft: 12,
          fontSize: 16,
          flexGrow: 1,
        }}
      >
        {data.shortName}
      </Text>
    </Pressable>
  );
});
