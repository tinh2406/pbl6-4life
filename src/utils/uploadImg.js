import axios from "axios"

export default async (file) => {

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    type: 'image/jpeg',
    name: 'myImage.jpg',
  });
  return await axios.post("https://tuna.whitemage.tech/api/upload-images/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}