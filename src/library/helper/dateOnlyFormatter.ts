const dateOnlyFormatter = (input: string) => {
  const date: Date = new Date(input);
  return date.toUTCString().substring(4, 16);
};

export default dateOnlyFormatter;
