import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { BackHandler } from "react-native";

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      if (!location) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          BackHandler.exitApp();
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          Latitude: location.coords.latitude,
          Longitude: location.coords.longitude,
        });
      }
    })();
  }, [location]);
  console.log(location,"location");
  const value = {
    location,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
