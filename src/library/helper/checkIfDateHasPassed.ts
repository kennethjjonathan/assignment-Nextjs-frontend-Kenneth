function checkIfDateHasPassed(input: string): boolean {
  const testDate: Date = new Date(input);
  const today: Date = new Date();
  if (testDate <= today) {
    return true;
  }
  return false;
}

export default checkIfDateHasPassed;
