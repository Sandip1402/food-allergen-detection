import API from "./api";

export const analyzeImage = async (
  imageUri: string,
  mode: "food" | "ingredient"
) => {
  const formData = new FormData();

  formData.append("mode", mode);

  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "image.jpg",
  } as any);

  const response = await API.post("/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};