const dateFormatter = (input: string) => {
  const date: Date = new Date(input);
  return date.toLocaleString("en-GB");
};

export default dateFormatter;
