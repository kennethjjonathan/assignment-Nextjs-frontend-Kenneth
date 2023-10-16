function moneyFormatter(input: number): string {
  return input.toLocaleString("id-ID", { minimumFractionDigits: 2 });
}

export default moneyFormatter;
