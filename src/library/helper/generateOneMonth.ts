const generateOneMonth = (input?: string): Date => {
  let today: Date = new Date();
  if (input !== undefined) {
    today = new Date(input);
  }
  return new Date(today.setMonth(today.getMonth() + 1));
};

export default generateOneMonth;
