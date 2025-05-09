export interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export interface Summary {
  totalDeposit: number;
  totalWithdraw: number;
  totalBalance: number;
  pendingTransactions: number;
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

export interface DashboardResponse {
  monthlyTransactionComparisonData: MonthlyTransactionComparisonData[];
  monthlyTransactionData: MonthlyTransactionData[];
  summary: Summary;
}

export interface TransactionOptions {
  states: string[];
  accounts: string[];
  industries: string[];
}

export interface FetchDashboardDataParams {
  date?: string;
  account?: string;
  industry?: string;
  state?: string;
}
