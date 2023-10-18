function hourFormatter(input: string) {
  const date: Date = new Date(input);
  return date.toUTCString().substring(16, 22);
}

export default hourFormatter;
