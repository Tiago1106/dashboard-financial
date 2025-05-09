import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { formatAmountToNumber } from '@/utils/formats';
import { Transaction, Summary } from '@/utils/dashboard/types';

interface GroupedByMonth {
  [key: string]: { deposit: number; withdraw: number };
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/transactions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: Transaction[] = JSON.parse(fileContent);

    const deposits = data.filter(t => t.transaction_type === 'deposit');
    const withdraws = data.filter(t => t.transaction_type === 'withdraw');

    const totalDeposit = deposits.reduce(
      (acc, t) => acc + formatAmountToNumber(t.amount),
      0
    );
    const totalWithdraw = withdraws.reduce(
      (acc, t) => acc + formatAmountToNumber(t.amount),
      0
    );
    const totalBalance = totalDeposit - totalWithdraw;

    const pendingTransactions = data.filter(t => t.date > Date.now()).length;

    const groupedByMonth: GroupedByMonth = {};
    const lineGroupedByMonth: GroupedByMonth = {};

    data.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!groupedByMonth[key]) groupedByMonth[key] = { deposit: 0, withdraw: 0 };
      groupedByMonth[key][t.transaction_type] += formatAmountToNumber(t.amount);

      if (!lineGroupedByMonth[key]) lineGroupedByMonth[key] = { deposit: 0, withdraw: 0 };
      lineGroupedByMonth[key][t.transaction_type] += formatAmountToNumber(t.amount);
    });

    const monthlyTransactionComparisonData = Object.entries(groupedByMonth).map(
      ([month, data]) => ({
        month,
        deposit: data.deposit,
        withdraw: data.withdraw,
      })
    );

    const monthlyTransactionData = Object.entries(lineGroupedByMonth).map(
      ([month, data]) => ({
        month,
        deposit: data.deposit,
        withdraw: data.withdraw,
      })
    );

    const summary: Summary = {
      totalDeposit,
      totalWithdraw,
      totalBalance,
      pendingTransactions,
    };

    return NextResponse.json({
      summary,
      monthlyTransactionComparisonData,
      monthlyTransactionData,
    });
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    return NextResponse.json(
      { error: 'Erro ao carregar os dados' },
      { status: 500 }
    );
  }
}