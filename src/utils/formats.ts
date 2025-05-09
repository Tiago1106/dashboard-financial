export function formatAmount(value: string): string {
  const number = parseFloat(value) / 100;
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatAmountToNumber(value: string): number {
  return parseFloat(value) / 100;
}