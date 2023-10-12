import Axios from "axios";

async function uploadImage(file: File | undefined) {
  const formData = new FormData();
  if (file !== undefined) {
    formData.append("file", file);
  }
  formData.append("upload_preset", "wihn81mf");
  try {
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dzao5y5ah/image/upload",
      formData
    );
    return response.data.url;
  } catch (error) {
    throw error;
  }
}

export default uploadImage;
