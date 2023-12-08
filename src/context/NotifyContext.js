import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import * as Notifications from "expo-notifications";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import {
    registerForPushNotificationsAsync,
    schedulePushNotification,
} from "../utils/Notify";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotifyContext = createContext();
let connection;
export const useNotify = () => {
  return useContext(NotifyContext);
};
export const NotifyProvider = ({ children }) => {
  const { authState } = useAuth();
  const { onRefresh } = useUser();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!authState?.token) return;
    connection = new HubConnectionBuilder()
      .withUrl("https://tuna.whitemage.tech/NotificationHub", {
        accessTokenFactory: () => authState.token,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    connection.on(
      "ModReceiveNotifyNewBookingMessage",
      async function (message) {
        console.log(message, "ModReceiveNotifyNewBookingMessage");
        const data = JSON.parse(message);
        schedulePushNotification(
          "Your accommodation has new booking",
          data?.Content
        );
        queryClient.invalidateQueries("notifys");
      }
    );
    connection.on("GuestReceiveNotifyBookingSuccess", function (message) {
      console.log(message, "GuestReceiveNotifyBookingSuccess");
      const data = JSON.parse(message);
      schedulePushNotification("Booking successfully", data?.Content);
      queryClient.invalidateQueries("notifys");
    });
    connection.on("GuestReceiveNotifyApproveModMessage", function (message) {
      console.log(message, "GuestReceiveNotifyApproveModMessage");
      const data = JSON.parse(message);
      schedulePushNotification("Your request has been accepted", data?.Content);
      queryClient.invalidateQueries("notifys");

      onRefresh();////refresh user session
    });
    connection.on("GuestReceiveNotifyRejectModMessage", function (message) {
      console.log(message, "GuestReceiveNotifyRejectModMessage");
      const data = JSON.parse(message);
      schedulePushNotification("Your request has been denied", data?.Content);
      queryClient.invalidateQueries("notifys");
    });
    connection.on("ModReceiveNotifyBookingPaymentSuccess", function (message) {
      console.log(message, "ModReceiveNotifyBookingPaymentSuccess");
      const data = JSON.parse(message);
      schedulePushNotification("The customer has paid you", data?.Content);
      queryClient.invalidateQueries("notifys");
    });
    connection.on(
      "GuestReceiveNotifyBookingPaymentSuccess",
      function (message) {
        console.log(message, "GuestReceiveNotifyBookingPaymentSuccess");
        const data = JSON.parse(message);
        schedulePushNotification("Payment success", data?.Content);
        queryClient.invalidateQueries("notifys");
      }
    );
    connection.start().then(function () {
      console.log("Connected!");
    });
    return () => {
      if (connection) {
        connection.off("ModReceiveNotifyNewBookingMessage");
        connection.off("GuestReceiveNotifyBookingSuccess");
        connection.off("GuestReceiveNotifyApproveModMessage");
        connection.off("GuestReceiveNotifyRejectModMessage");
        connection.off("ModReceiveNotifyBookingPaymentSuccess");
        connection.off("GuestReceiveNotifyBookingPaymentSuccess");
        connection.stop();
      }
    };
  }, [authState.token]);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [lastNoti, setLastNoti] = useState();

  const value = {
    last: lastNoti,
    setLast: setLastNoti,
  };
  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
};
