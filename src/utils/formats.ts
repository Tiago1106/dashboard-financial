export function formatAmount(value: string): string {
  const number = parseFloat(value);
  return number.toLocaleString('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatAmountToNumber(value: string): number {
  return parseFloat(value) / 100;
}