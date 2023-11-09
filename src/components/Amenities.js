import { Ionicons } from "@expo/vector-icons";
import { memo, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ModalAmenities, { AmenityItem } from "./ModalAmenities";
import { useQuery } from "react-query";
import { instance } from "../context/AuthContext";

export const CreateAmenity = memo(({ setValue }) => {
  const [img, setImg] = useState();
  const [text, setText] = useState("");
  const launchLib = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImg(result.assets[0]);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Pressable onPress={launchLib}>
        {img ? (
          <Image
            source={{
              uri: img.uri,
            }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 4,
            }}
          />
        ) : (
          <Ionicons
            style={{
              width: 42,
              height: 42,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#565656",
              textAlign: "center",
              textAlignVertical: "center",
            }}
            name="add"
            size={30}
            color="black"
          />
        )}
      </Pressable>

      <TextInput
        style={{
          marginLeft: 12,
          fontSize: 16,
          flexGrow: 1,
        }}
        placeholder="Name of amenity"
        value={text}
        onChangeText={setText}
      />
      <Pressable
        onPress={() => {
          if (!img || !text) return;
          setValue((last) => [...last, { icon: img, name: text }]);
          setImg();
          setText("");
        }}
      >
        <Text
          style={{
            color: !img || !text ? "#8d8d8d" : "#0a9a16",
            fontWeight: "500",
          }}
        >
          Add
        </Text>
      </Pressable>
    </View>
  );
});
export const GetAmenity = memo(({ setValue }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
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
          Select amenity
        </Text>
      </Pressable>
      <ModalAmenities
        hidden={() => {
          setModalVisible(false);
        }}
        select={setValue}
        visible={modalVisible}
      />
    </>
  );
});
export const Amenity = memo(({ data, setValue }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Image
        source={{
          uri: data.icon,
        }}
        style={{
          width: 42,
          height: 42,
          borderRadius: 4,
        }}
      />
      <Text
        style={{
          marginLeft: 12,
          fontSize: 16,
          flexGrow: 1,
        }}
      >
        {data.name}
      </Text>
      <Pressable
        onPress={() => {
          setValue((value) => {
            const newArray = value.filter((i) => i.name !== data.name);
            return newArray;
          });
        }}
      >
        <Text
          style={{
            color: "#c82323",
            fontWeight: "500",
          }}
        >
          Delete
        </Text>
      </Pressable>
    </View>
  );
});
export const Amenities = memo(({value,setValue})=>{
    return(
        <View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                marginBottom: 6,
              }}
            >
              Amenities
            </Text>
            {value?.map((i) => (
              <Amenity key={i.name} data={{ icon: i.icon, name:i.name }} setValue={setValue} />
            ))}
            <GetAmenity setValue={setValue} />
          </View>
    )
})


export default memo(({postId})=>{
    // const { data, isLoading } = useQuery({
    //     queryKey: ["amenity", postId],
    //     queryFn: async () => {
    //       const res = await instance.get(`/api/amenities/${postId}`);
    //       return res.data;
    //     },
    //   });
    //   console.log(da);
    return(
        <View
        style={{
          marginHorizontal: 20,
          borderTopWidth: 1,
          borderColor: "#d5d5d5",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          What this place offers
        </Text>
        <AmenityItem data={{icon:"A",name:"name"}}/>
        <AmenityItem data={{icon:"A",name:"name"}}/>
        <AmenityItem data={{icon:"A",name:"name"}}/>
        <AmenityItem data={{icon:"A",name:"name"}}/>
        <AmenityItem data={{icon:"A",name:"name"}}/>
        
      </View>
    )
})