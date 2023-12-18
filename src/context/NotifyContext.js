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
  const [hasNew, setHasNew] = useState(false);
  const [newNoti, setNewNoti] = useState(new Set());

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
        setHasNew(true);
        if (data?.Id) addToSet(data.Id);
        queryClient.invalidateQueries("notifys");
        queryClient.invalidateQueries("bookings_of_myrooms");
      }
    );
    connection.on("GuestReceiveNotifyBookingSuccess", function (message) {
      console.log(message, "GuestReceiveNotifyBookingSuccess");
      const data = JSON.parse(message);
      schedulePushNotification("Booking successfully", data?.Content);
      setHasNew(true);
      console.log(data, data?.Id);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");
      queryClient.invalidateQueries("bookings");
    });
    connection.on("GuestReceiveNotifyApproveModMessage", function (message) {
      console.log(message, "GuestReceiveNotifyApproveModMessage");
      const data = JSON.parse(message);
      schedulePushNotification("Your request has been accepted", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");

      onRefresh(); ////refresh user session
    });
    connection.on("GuestReceiveNotifyRejectModMessage", function (message) {
      console.log(message, "GuestReceiveNotifyRejectModMessage");
      const data = JSON.parse(message);
      schedulePushNotification("Your request has been denied", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");

      onRefresh(); ////refresh user session
    });
    connection.on("ModReceiveNotifyBookingPaymentSuccess", function (message) {
      console.log(message, "ModReceiveNotifyBookingPaymentSuccess");
      const data = JSON.parse(message);
      schedulePushNotification("The customer has paid you", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");
      queryClient.invalidateQueries("bookings_of_myrooms");
    });
    connection.on(
      "GuestReceiveNotifyBookingPaymentSuccess",
      function (message) {
        console.log(message, "GuestReceiveNotifyBookingPaymentSuccess");
        const data = JSON.parse(message);
        schedulePushNotification("Payment success", data?.Content);
        setHasNew(true);
        if (data?.Id) addToSet(data.Id);
        queryClient.invalidateQueries("notifys");
        queryClient.invalidateQueries("bookings");
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

  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync(() => {});

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // setNotification(notification);
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

  const addToSet = (value) => {
    const newSet = new Set(newNoti);
    newSet.add(value);
    setNewNoti(newSet);
  };
  // Hàm xoá phần tử khỏi set
  const deleteFromSet = (value) => {
    const newSet = new Set(newNoti);
    newSet.delete(value);
    setNewNoti(newSet);
  };

  const value = {
    hasNew: hasNew,
    setHasNew: setHasNew,
    newNoti,
    removeNoti: deleteFromSet,
  };
  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
};
