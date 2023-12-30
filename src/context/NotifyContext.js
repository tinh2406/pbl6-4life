import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import * as Notifications from "expo-notifications";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "../utils/Notify";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [newNoti, setNewNoti] = useState([]);
  const [modalPayment, setModalPayment] = useState(false);
  const [last, setLast] = useState();
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
        setModalPayment(data.Note.replace("Booking Id: ", ""));
        if (data?.Id) addToSet(data.Id);
        queryClient.invalidateQueries("notifys");
        queryClient.invalidateQueries("bookings");
      }
    );
    connection.on(
      "GuestReceiveNotifyApproveCancelBookingMessage",
      function (message) {
        console.log(message, "GuestReceiveNotifyApproveCancelBookingMessage");
        const data = JSON.parse(message);
        schedulePushNotification("Canceled booking success", data?.Content);
        setHasNew(true);
        if (data?.Id) addToSet(data.Id);
        queryClient.invalidateQueries("notifys");
        queryClient.invalidateQueries("bookings");
      }
    );
    connection.on(
      "GuestReceiveNotifyRejectCancelBookingMessage",
      function (message) {
        console.log(message, "GuestReceiveNotifyRejectCancelBookingMessage");
        const data = JSON.parse(message);
        schedulePushNotification("Canceled booking fail", data?.Content);
        setHasNew(true);
        if (data?.Id) addToSet(data.Id);
        queryClient.invalidateQueries("notifys");
        queryClient.invalidateQueries("bookings");
      }
    );
    connection.on("GuestReceiveNotifyCancelBookingMessage", function (message) {
      console.log(message, "GuestReceiveNotifyCancelBookingMessage");
      const data = JSON.parse(message);
      schedulePushNotification("Booking has been canceled", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");
      queryClient.invalidateQueries("bookings");
    });
    connection.on(
      "ModReceiveNotifyRequestCancelBookingMessage",
      function (message) {
        console.log(message, "ModReceiveNotifyRequestCancelBookingMessage");
        const data = JSON.parse(message);
        schedulePushNotification("Cancel booking", data?.Content);
        setHasNew(true);
        if (data?.Id) addToSet(data.Id);
        queryClient.invalidateQueries("notifys");
        queryClient.invalidateQueries("bookings_of_myrooms");
      }
    );
    connection.on("ModReceiveNotifyNewReviewMessage", function (message) {
      console.log(message, "ModReceiveNotifyNewReviewMessage");
      const data = JSON.parse(message);
      schedulePushNotification("New review", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");
      queryClient.invalidateQueries("post");
      queryClient.invalidateQueries("preview-review");
      queryClient.invalidateQueries("reviews");
    });
    connection.on("ModReceiveNotifyRevokeCancelBookingMessage", function (message) {
      console.log(message, "ModReceiveNotifyRevokeCancelBookingMessage");
      const data = JSON.parse(message);
      schedulePushNotification("New notify", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");
      queryClient.invalidateQueries("bookings_of_myrooms");
    });
    connection.on("GuestReceiveNotifyRejectBookingMessage", function (message) {
      console.log(message, "GuestReceiveNotifyRejectBookingMessage");
      const data = JSON.parse(message);
      schedulePushNotification("New notify", data?.Content);
      setHasNew(true);
      if (data?.Id) addToSet(data.Id);
      queryClient.invalidateQueries("notifys");
      queryClient.invalidateQueries("bookings");
    });
    const connect = async () => {
      const isConnect = false;
      while (isConnect) {
        try {
          await connection.start();
          console.log("Connected!");
          isConnect = true;
        } catch (error) {}
      }
    };
    connect();
    return () => {
      if (connection) {
        connection.off("ModReceiveNotifyNewBookingMessage");
        connection.off("GuestReceiveNotifyBookingSuccess");
        connection.off("GuestReceiveNotifyApproveModMessage");
        connection.off("GuestReceiveNotifyRejectModMessage");
        connection.off("ModReceiveNotifyBookingPaymentSuccess");
        connection.off("GuestReceiveNotifyBookingPaymentSuccess");
        connection.off("ModReceiveNotifyRequestCancelBookingMessage");
        connection.off("GuestReceiveNotifyApproveCancelBookingMessage");
        connection.off("GuestReceiveNotifyRejectCancelBookingMessage");
        connection.off("GuestReceiveNotifyCancelBookingMessage");
        connection.off("ModReceiveNotifyNewReviewMessage");
        connection.off("ModReceiveNotifyRevokeCancelBookingMessage");
        connection.off("GuestReceiveNotifyRejectBookingMessage");
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
  useEffect(() => {
    const loadLast = async () => {
      const res = await AsyncStorage.getItem("last_notifications");
      setLast(res);
    };
    loadLast();
  }, []);
  const addToSet = useCallback((value) => {
    setNewNoti((last) => [...last, value]);
  }, []);
  const deleteFromSet = useCallback((value) => {
    setNewNoti((last) => last.filter((i) => i !== value));
  }, []);
  const updateLast = useCallback(() => {
    setLast(Date.now().toString());
    AsyncStorage.setItem("last_notifications", Date.now().toString());
  }, []);

  const value = {
    hasNew: hasNew,
    setHasNew: setHasNew,
    newNoti,
    removeNoti: deleteFromSet,
    addNoti: addToSet,
    modalPayment,
    updateLast,
    last,
  };
  return (
    <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>
  );
};
