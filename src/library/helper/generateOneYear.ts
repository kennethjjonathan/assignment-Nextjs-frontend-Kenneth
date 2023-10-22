const generateOneYear = (input?: string): Date => {
  let today: Date = new Date();
  if (input !== undefined) {
    today = new Date(input);
  }
  return new Date(today.setFullYear(today.getFullYear() + 1));
};

export default generateOneYear;
