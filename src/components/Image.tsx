import { Image, ImageStyle } from "expo-image";
import { GestureResponderEvent, StyleProp } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default ({
  src,
  style,
  transition,
}: {
  src: string;
  style: StyleProp<ImageStyle>;
  transition?: number;
}) => {
  let imgBlur: string;
  if (src) {
    try {
    if (src.includes("cloudinary"))
      imgBlur =
        src.split("upload/")[0] + "upload/w_64,h_48/" + src.split("upload/")[1];
    else if (src.includes("picsum"))
      imgBlur = src.replace("/640/480", "/64/48");
    // console.log(src);
    }catch (e) {
      console.log(JSON.stringify(e));
      console.log(src);
      
      
    }
  }

  return (
    <Image
      source={{
        uri: src,
        cacheKey: src,
        headers:{
          
        }
      }}
      style={style}
      placeholder={imgBlur || blurhash}
      contentFit="cover"
      transition={transition || 500}
      cachePolicy="disk"
    />
  );
};
