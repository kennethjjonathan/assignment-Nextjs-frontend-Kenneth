const generateOneMonth = (): Date => {
  const today: Date = new Date();
  return new Date(today.setMonth(today.getMonth() + 1));
};

export default generateOneMonth;
