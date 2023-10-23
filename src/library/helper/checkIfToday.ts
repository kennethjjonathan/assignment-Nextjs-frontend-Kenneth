function checkIfToday(input: string): boolean {
  const today: Date = new Date();
  const inputDate: Date = new Date(input);

  console.log(inputDate);

  if (
    today.getDate() === inputDate.getDate() - 1 &&
    today.getMonth() === inputDate.getMonth() &&
    today.getFullYear() === inputDate.getFullYear()
  ) {
    return true;
  }

  return false;
}

export default checkIfToday;
