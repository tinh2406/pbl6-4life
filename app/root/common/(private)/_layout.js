import {
  Redirect,
  Slot,
  Tabs,
  useFocusEffect,
  useNavigation,
} from "expo-router";
import { useAuth } from "../../../../src/context/AuthContext";
import { useWindowDimensions } from "react-native";
import ModalLogin from "../../../../src/components/ModalLogin";
import { useCallback, useMemo, useState } from "react";

export default () => {
  const { width } = useWindowDimensions().width;
  const { authState } = useAuth();

  const [modalVisible, setModalVisible] = useState(!authState.authenticated);
  useFocusEffect(
    useCallback(() => {
      setModalVisible(!authState.authenticated);
    }, [authState])
  );
  return (
    <>
      <ModalLogin
        visible={modalVisible}
        hidden={() => setModalVisible(false)}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          contentStyle: {
            width: "100%",
            height: "100%",
            backgroundColor: "#FFF9FA",
          },
          freezeOnBlur: true,
        }}
      />
    </>
  );
};
