import { Ionicons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useUser } from "../../../src/context/UserContext";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ModalPrompt from "../../../src/components/ModalPrompt";
import defaultAvt from "../../../src/assets/defaultAvatar.png";
export default () => {
  const [image, setImage] = useState(null);
  const { userId } = useGlobalSearchParams();
  const { user, onUpdateAVT, onVerifyEmail, onConfirmEmail } = useUser();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
      await onUpdateAVT(result.assets[0]);
    }
  };
  console.log(defaultAvt);
  return (
    <View style={{ height: "100%", backgroundColor: "#fafeff" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Ionicons
            name="chevron-back"
            size={20}
            color={"#6b6b6b"}
            onPress={() => {
              router.back();
            }}
            style={{
              padding: 20,
            }}
          />

          <View
            style={{
              marginHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: 20,
              backgroundColor: "#ffffff",
              shadowColor: "#747474",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
              borderRadius: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  borderRadius: 100,
                  margin: 20,
                }}
                disabled={userId !== user?.id}
                onPress={handleUploadImage}
              >
                <Image
                  source={
                    image?.uri || user?.avatar ?
                    {
                    uri:
                      image?.uri ||
                      user?.avatar
                    }
                    :
                    defaultAvt
                  }
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 100,
                  }}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                {user?.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
                {user.statusModRole === "Active" ? "Mod" : "Guest"}
              </Text>
            </View>
            {user.statusModRole === "Active" && (
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  marginHorizontal: 20,
                  marginTop: 20,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    Nums of posts
                  </Text>
                  <Text></Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    Nums of likes
                  </Text>
                  <Text></Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    Nums of comments
                  </Text>
                  <Text></Text>
                </View>
              </View>
            )}
          </View>
        </View>
        {user.statusModRole === "Active"}
        {user.statusModRole === "Waiting" && (
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Waiting for admin approval
          </Text>
        )}
        {!user.statusModRole && (
          <Pressable
            style={{
              borderRadius: 10,
              backgroundColor: loading ? "#929292" : "#FF385C",
              padding: 10,
              margin: 20,
            }}
            onPress={async () => {
              if (loading) return;
              setLoading(true);
              if (!user.emailConfirmed) {
                const res = await onVerifyEmail();
                if (!res?.success) return;
                setVisible(true);
                setLoading(false);
              } else {
                router.push("root/request_mod");
              }
            }}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Create your profile?
              </Text>
            )}
          </Pressable>
        )}
        <ModalPrompt
          title="Verify your code"
          message="Please enter the code sent to your email"
          visible={visible}
          onChangeText={setCode}
          onCancel={() => setVisible(false)}
          code={code}
          onConfirm={async () => {
            const res = await onConfirmEmail(code);
            if (res?.success) {
              router.push("root/request_mod");
            }
          }}
        />
      </View>
    </View>
  );
};
