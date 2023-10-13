function scrCloudinaryFormatter(input: string) {
  return input.replace("https://res.cloudinary.com/dzao5y5ah/image/upload", "");
}

export default scrCloudinaryFormatter;
