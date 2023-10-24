import errorNotify from "./errorNotify";

const urlToFileConverter = async (url: string, imageName: string) => {
  const newUrl: string = url.replace("http", "https");
  try {
    const response = await fetch(newUrl);
    if (!response.ok) {
      errorNotify(response);
      throw new Error(response.statusText);
    }
    const blob = await response.blob();
    return new File([blob], imageName, { type: blob.type });
  } catch (error) {
    console.error(error);
  }
};

export default urlToFileConverter;
