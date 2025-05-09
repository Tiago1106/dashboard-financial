import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import { formatAmountToNumber } from '@/utils/formats';
import { Transaction, Summary } from '@/utils/dashboard/types';

interface GroupedByMonth {
  [key: string]: { deposit: number; withdraw: number };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = path.join(process.cwd(), 'public/data/transactions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: Transaction[] = JSON.parse(fileContent);

    const dateFilter = searchParams.get('date');
    const accountFilter = searchParams.get('account');
    const industryFilter = searchParams.get('industry');
    const stateFilter = searchParams.get('state');

    let filteredData = data;

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filteredData = filteredData.filter(t => new Date(t.date).toDateString() === filterDate.toDateString());
    }

    if (accountFilter) {
      filteredData = filteredData.filter(t => t.account === accountFilter);
    }

    if (industryFilter) {
      filteredData = filteredData.filter(t => t.industry === industryFilter);
    }

    if (stateFilter) {
      filteredData = filteredData.filter(t => t.state === stateFilter);
    }

    const deposits = filteredData.filter(t => t.transaction_type === 'deposit');
    const withdraws = filteredData.filter(t => t.transaction_type === 'withdraw');

    const totalDeposit = deposits.reduce(
      (acc, t) => acc + formatAmountToNumber(t.amount),
      0
    );
    const totalWithdraw = withdraws.reduce(
      (acc, t) => acc + formatAmountToNumber(t.amount),
      0
    );
    const totalBalance = totalDeposit - totalWithdraw;

    const pendingTransactions = filteredData.filter(t => t.date > Date.now()).length;

    const groupedByMonth: GroupedByMonth = {};
    const lineGroupedByMonth: GroupedByMonth = {};

    filteredData.forEach(t => {
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