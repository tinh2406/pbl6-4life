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
    (() => {
      if (!location?.Latitude) {
        Location.requestForegroundPermissionsAsync().then(async (res) => {
          if (!res.granted) {
            BackHandler.exitApp();
            return;
          }
          let location;
          while (!location) {
            location = await Location.getCurrentPositionAsync({});
          }

          setLocation({
            Latitude: location.coords.latitude,
            Longitude: location.coords.longitude,
          });
        });
      }
    })();
  }, [location, setLocation]);

  const value = {
    location,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
