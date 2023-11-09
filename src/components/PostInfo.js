import { Entypo, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { memo, useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import { instance } from "../context/AuthContext";
import ModalLocation from "./ModalLocation";
import ModalMap from "./ModalMap";

export const Location = memo(({ value, setValue, error }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        Location
      </Text>
      <Pressable
        style={{
          padding: 6,
          backgroundColor: "#e4e4e4",
          marginRight: 5,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: "#a5a5a5",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons
          name="location-outline"
          size={16}
          color="black"
          style={{
            paddingHorizontal: 6,
          }}
        />
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {value ? `${value.district}, ${value.city}` : "Select location"}
        </Text>
      </Pressable>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
      <ModalLocation
        hidden={() => {
          setModalVisible(false);
        }}
        select={setValue}
        visible={modalVisible}
      />
    </View>
  );
});

export const InputInfo = memo(
  ({
    title,
    placeholder,
    type,
    value,
    setValue,
    column,
    multiline,
    minH,
    error,
  }) => {
    return (
      <View
        style={{
          flexDirection: column ? "column" : "row",
          alignItems: column ? "flex-start" : "center",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
        {type === "numeric" ? (
          <View style={{}}>
            <NumericInput
              type="plus-minus"
              value={value}
              onChange={(value) => setValue(value)}
              minValue={0}
              totalHeight={34}
              totalWidth={80}
            />
          </View>
        ) : (
          <TextInput
            multiline={multiline}
            style={{
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 4,
              fontSize: 15,
              borderColor: "#a5a5a5",
              width: column ? "100%" : 90,
              textAlign: column ? "left" : "right",
              minHeight: multiline ? minH || 50 : 20,
              textAlignVertical: multiline ? "top" : "auto",
            }}
            placeholder={placeholder}
            value={value}
            onChangeText={setValue}
          />
        )}
        {error && (
          <Text
            style={{
              fontSize: 15,
              color: "#ff2a00",
            }}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

export const Type = memo(({ value, setValue, error }) => {
  const [types, setTypes] = useState();
  useEffect(() => {
    const getTypes = async () => {
      const local = await AsyncStorage.getItem("types");
      if (local) {
        setTypes(JSON.parse(types));
        return;
      }
      try {
        const fetch = await instance.get("api/types");
        if (fetch) {
          setTypes(fetch.data);
          AsyncStorage.setItem("types", JSON.stringify(fetch.data));
          return;
        }
      } catch (error) {}

      setTypes(["Hotel", "Motel", "Homestay", "Resort", "Villa"]);
    };
    getTypes();
  }, []);
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        Type
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {types?.map((i, index) => (
          <Pressable
            onPress={() => setValue(i)}
            key={i}
            style={{
              flex: 1,
              justifyContent: "center",
              paddingVertical: 8,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderTopLeftRadius: index === 0 ? 5 : 0,
              borderBottomLeftRadius: index === 0 ? 5 : 0,
              borderTopRightRadius: index === types?.length - 1 ? 5 : 0,
              borderBottomRightRadius: index === types?.length - 1 ? 5 : 0,
              borderColor: value !== i ? "rgba(163, 155, 155, 0.3)" : "#FF385C",
              backgroundColor: value !== i ? "white" : "#FF385C",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                color: value !== i ? "black" : "white",
              }}
            >
              {i}
            </Text>
          </Pressable>
        ))}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
export const PickLocated = memo(({ value, setValue, error }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        Toạ độ chính xác :v
      </Text>
      <Pressable
        style={{
          padding: 6,
          backgroundColor: "#e4e4e4",
          marginRight: 5,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: "#a5a5a5",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          {value ? `${value.latitude}, ${value.longitude}` : "Select location"}
        </Text>
      </Pressable>
      <ModalMap
        visible={modalVisible}
        hidden={() => setModalVisible(false)}
        select={setValue}
      />
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
export const ImagesOfAccomodation = memo(({ value, setValue, error }) => {
  
  const select = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,

      quality: 1,
    });
    if (!result.canceled) {
      setValue(result.assets);
    }
  };
  return (
    <View
      style={{
        marginBottom: 6,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
        }}
      >
        Images of accommodation
      </Text>
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: "#908a8a",
          borderRadius: 10,
          marginHorizontal: 10,
          overflow: "hidden",
          aspectRatio: 1.59,
        }}
        onPress={select}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ color: "#0091ff", fontWeight: "500" }}>
            Select more image
          </Text>
          <Entypo name="image" size={72} color="#0091ff" />
        </View>
      </Pressable>
      <View style={{paddingHorizontal:10}}>
      {value?.map((img, i) => (
        <View
        key={i}

          style={{
            position:"relative"
          }}
        >
        <Image
          source={{
            uri: img.uri,
          }}
          style={{
            borderWidth: 1,
            borderColor: "#908a8a",
            borderRadius: 10,
            marginTop: 10,
            width: "100%",
            aspectRatio: 3 / 2,
          }}
        />
        <Ionicons name="close-circle" size={24} style={{position:"absolute",top:15,right:5}}
          onPress={()=>{
            setValue(last=>last?.filter(i=>i!==img))
          }}
        />
        </View>
      ))}
      </View>
      {error && (
        <Text
          style={{
            fontSize: 15,
            color: "#ff2a00",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});
