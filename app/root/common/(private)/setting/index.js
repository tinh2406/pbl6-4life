import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import TabBar from "../../../../../src/components/TabBar";
import { router, useNavigation } from "expo-router";
import { useUser } from "../../../../../src/context/UserContext";
import ImageAvt from "../../../../../src/components/ImageAvt";
export default () => {
  const navigation = useNavigation();
  const { user, onLogout } = useUser();
  const width = useWindowDimensions().width;

  return (
    <View style={{ height: "100%", backgroundColor: "#fafeff" }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginTop: 30,
            marginHorizontal: 30,
          }}
        >
          Profile
        </Text>
        {user ? (
          <View>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                paddingVertical: 16,
                marginTop: 20,
                marginHorizontal: 20,
                borderColor: "#d4d4d4",
              }}
              onPress={() => {
                router.push(`root/common/setting/profile`);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <ImageAvt
                  src={user?.avatar}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    marginLeft: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {user?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#7e7e7e",
                    }}
                  >
                    {user?.email}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={"#7e7e7e"} />
            </Pressable>
            <View
              style={{
                marginHorizontal: 20,
              }}
            >
              {user?.statusModRole === "Active" && (
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      marginBottom: 12,
                    }}
                  >
                    Your rooms
                  </Text>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      borderColor: "#d4d4d4",
                    }}
                    onPress={() => {
                      router.push(`root/common/setting/profile`);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                      }}
                    >
                      <Ionicons name="list-outline" size={20} color="#4b4b4b" />
                      <Text style={{ color: "#4b4b4b", marginLeft: 10 }}>
                        Your rooms
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={"#4b4b4b"}
                    />
                  </Pressable>
                </View>
              )}
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginBottom: 12,
                  }}
                >
                  Historys
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    borderColor: "#d4d4d4",
                  }}
                  onPress={() => {
                    router.push("root/mytrip");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <AntDesign name="barschart" size={20} color="#4b4b4b" />
                    <Text style={{ color: "#4b4b4b", marginLeft: 10 }}>
                      Your trips
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={"#4b4b4b"}
                  />
                </Pressable>
                {user.statusModRole === "Active" && (
                  <Pressable
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                      borderColor: "#d4d4d4",
                    }}
                    onPress={() => {
                      router.push("/root/myreservation");
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                      }}
                    >
                      <MaterialIcons
                        name="rate-review"
                        size={20}
                        color="#4b4b4b"
                      />
                      <Text style={{ color: "#4b4b4b", marginLeft: 10 }}>
                        Your reservations
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={"#4b4b4b"}
                    />
                  </Pressable>
                )}
              </View>
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginBottom: 12,
                  }}
                >
                  Settings
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    borderColor: "#d4d4d4",
                  }}
                  onPress={() => {
                    navigation.navigate("personal");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={"#4b4b4b"}
                    />
                    <Text style={{ color: "#4b4b4b", marginLeft: 10 }}>
                      Personal information
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={"#4b4b4b"}
                  />
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    borderColor: "#d4d4d4",
                  }}
                  onPress={() => {
                    navigation.navigate("security");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}
                  >
                    <Ionicons
                      name="shield-outline"
                      size={20}
                      color={"#4b4b4b"}
                    />
                    <Text style={{ color: "#4b4b4b", marginLeft: 10 }}>
                      Login & security
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={"#4b4b4b"}
                  />
                </Pressable>
              </View>
              <Pressable
                style={{
                  marginTop: 20,
                }}
                onPress={async () => {
                  await onLogout();
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <View
              style={{
                marginHorizontal: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  paddingTop: 40,
                }}
              >
                Login to your profile
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: 50,
                }}
              >
                <Pressable
                  style={{
                    width: "70%",
                  }}
                  onPress={() => {
                    router.replace("root/authen");
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "white",
                      paddingVertical: 14,
                      paddingHorizontal: 20,
                      backgroundColor: "#ff385c",
                      borderRadius: 20,
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
      {width >= 768 || <TabBar currentScreen={"profile"} />}
    </View>
  );
};
