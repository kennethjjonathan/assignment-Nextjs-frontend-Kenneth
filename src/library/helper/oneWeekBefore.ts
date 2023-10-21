const oneWeekBefore = (): string => {
  const today: Date = new Date();
  return new Date(today.setDate(today.getDate() - 7))
    .toISOString()
    .substring(0, 10);
};

export default oneWeekBefore;
