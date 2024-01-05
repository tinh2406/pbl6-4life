import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, router, useNavigation } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "../../../src/context/AuthContext";

export default () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const email = navigation.getState().routes[1].params?.email;
  const otp = navigation.getState().routes[1].params?.otp;

  const toast = useToast();
  const width = useWindowDimensions().width;
  const [loading, setLoading] = useState(false);
  const { onReset } = useAuth();
  const handleResetPW = async () => {
    if (!email || password === "" || password !== rePassword) return;
    setLoading(true);
    const result = await onReset(email, otp, password);
    if (result.success) {
      router.replace("/root/authen/login");
      router.setParams({ email });
    } else if (result.message) {
      toast.show(result.message, {
        type: "danger",
        placement: "top",
      });
    }
    setLoading(false);
  };
  if (!email || !otp) return <Redirect href={"/root"} />;

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior="position"
        style={{
          width: width >= 1200 ? "80%" : "100%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          <MaterialCommunityIcons name="home-roof" size={72} color="#FF385C" />
          <Text
            style={{
              fontSize: 24,
              color: "#FF385C",
            }}
          >
            4LIFE
          </Text>
        </View>
        <View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 30,
              marginRight: 50,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="black"
              style={{ padding: 5, left: -5 }}
              onPress={() => router.back()}
            />
            <Text
              style={{
                fontSize: 16,
                color: "#5e2832",
                marginTop: 10,
              }}
            >
              Type new password for {email}
            </Text>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginLeft: 30,
              marginRight: 50,
            }}
          >
            <MaterialCommunityIcons
              name="lock-outline"
              size={32}
              color="#FF385C"
              style={{
                marginRight: 20,
              }}
            />

            <TextInput
              placeholder="Password"
              style={{
                color: "#FF385C",
                padding: 10,
                backgroundColor: "white",
                flex: 1,
                borderRadius: 10,
                fontSize: 16,
              }}
              secureTextEntry={!showPass}
              placeholderTextColor="#ff8fa2"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <MaterialCommunityIcons
              name={showPass ? "eye" : "eye-off"}
              size={24}
              color="#FF385C"
              style={{
                position: "absolute",
                right: 10,
                padding: 5,
                display: password === "" ? "none" : "flex",
              }}
              onPress={() => setShowPass(!showPass)}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginLeft: 30,
              marginRight: 50,
            }}
          >
            <Feather
              name="repeat"
              size={26}
              color="#FF385C"
              style={{
                padding: 3,
                marginRight: 20,
              }}
            />

            <TextInput
              placeholder="Repeat password"
              style={{
                color: "#FF385C",
                padding: 10,
                backgroundColor: "white",
                flex: 1,
                borderRadius: 10,
                fontSize: 16,
              }}
              secureTextEntry={!showPass}
              placeholderTextColor="#ff8fa2"
              value={rePassword}
              onChangeText={(text) => setRePassword(text)}
            />
            <MaterialCommunityIcons
              name="close"
              size={24}
              color="#FF385C"
              style={{
                position: "absolute",
                right: 10,
                padding: 5,
                display: rePassword === "" ? "none" : "flex",
              }}
              onPress={() => setRePassword("")}
            />
          </View>
        </View>

        <Pressable
          style={{
            marginTop: 20,
            marginHorizontal: 40,
            marginBottom: 40,
          }}
          disabled={loading}
          onPress={handleResetPW}
        >
          <View
            style={{
              padding: 12,
              borderRadius: 50,
              backgroundColor:
                password === "" || password !== rePassword
                  ? "#929292"
                  : "#FF385C",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size={28} color={"white"} />
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                Reset password
              </Text>
            )}
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
