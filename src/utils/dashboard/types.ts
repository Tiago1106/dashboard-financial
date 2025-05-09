export interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export interface MonthlyTransactionData {
  month: string;
  deposit: number;
  withdraw: number;
}

export interface MonthlyTransactionComparisonData {
  month: string;
  deposit: number;
  withdraw: number;
}