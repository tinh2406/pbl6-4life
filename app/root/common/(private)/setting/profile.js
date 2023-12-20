import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useGlobalSearchParams } from "expo-router";
import { memo, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import defaultAvt from "../../../../../src/assets/defaultAvatar.png";
import FlatListAutoLoad from "../../../../../src/components/FlatListAutoLoad";
import ModalPrompt from "../../../../../src/components/ModalPrompt";
import { useUser } from "../../../../../src/context/UserContext";
export default () => {
  const { user, onVerifyEmail, onConfirmEmail } = useUser();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);

  const [Flatlist, setFlatList] = useState(<UserCard />);

  useEffect(() => {
    if (user.statusModRole !== "Active") setFlatList(<UserCard />);
    else {
      setFlatList(
        <FlatListAutoLoad
          url="/api/accommodations/self"
          params={{ PageSize: 5 }}
          queryKey={["my-posts"]}
          headercomponent={UserCard}
        />
      );
    }
  }, [user.statusModRole]);

  return (
    <View style={{ height: "100%", backgroundColor: "#fafeff" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        {Flatlist}
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
        {user.statusModRole === "Active" && (
          <Pressable
            style={{
              borderRadius: 10,
              backgroundColor: loading ? "#929292" : "#FF385C",
              padding: 10,
              margin: 20,
            }}
            onPress={() => {
              router.push("root/accommodation/create");
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Create new accommodation
            </Text>
          </Pressable>
        )}
        {!user?.statusModRole && (
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
                router.push("root/request/mod");
                setLoading(false);
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
              router.push("root/request/mod");
            }
          }}
        />
      </View>
    </View>
  );
};

const UserCard = memo(() => {
  const [image, setImage] = useState(null);
  const { userId } = useGlobalSearchParams();
  const { user, onUpdateAVT } = useUser();
  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
      await onUpdateAVT(result.assets[0]);
    }
  };
  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <Ionicons
        name="chevron-back"
        size={20}
        color={"#6b6b6b"}
        onPress={() => {
          router.back();
        }}
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      />

      <View
        style={{
          marginHorizontal: 10,
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
                image?.uri || user?.avatar
                  ? {
                      uri: image?.uri || user?.avatar,
                    }
                  : defaultAvt
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
  );
});
