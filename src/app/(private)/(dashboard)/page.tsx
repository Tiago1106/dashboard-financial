"use client"

import { useEffect, useState } from "react";
import ky from "ky";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { CardInfo } from "@/components/card-info";
import { toast } from "sonner";
import { Transaction, MonthlyTransactionComparisonData, MonthlyTransactionData } from "@/utils/dashboard/types";
import { formatAmount, formatAmountToNumber } from "@/utils/formats";
import { CustomTooltip } from "@/components/tooltip-chats";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    totalBalance: 0,
    pendingTransactions: 0,
  });

  const [monthlyTransactionData, setMonthlyTransactionData] = useState<MonthlyTransactionData[]>([]);
  const [monthlyTransactionComparisonData, setMonthlyTransactionComparisonData] = useState<MonthlyTransactionComparisonData[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await ky.get("/data/transactions.json").json<Transaction[]>();

        const deposits = data.filter(t => t.transaction_type === "deposit");
        const withdraws = data.filter(t => t.transaction_type === "withdraw");

        const totalDeposit = deposits.reduce((acc: number, t: Transaction) => acc + formatAmountToNumber(t.amount), 0);
        const totalWithdraw = withdraws.reduce((acc: number, t: Transaction) => acc + formatAmountToNumber(t.amount), 0);
        const totalBalance = totalDeposit - totalWithdraw;

        const pendingTransactions = data.filter(t => t.date > Date.now()).length;

        setSummary({
          totalDeposit,
          totalWithdraw,
          totalBalance,
          pendingTransactions,
        });

        const groupedByMonth: { [key: string]: { deposit: number; withdraw: number } } = {};
        const lineGroupedByMonth: { [key: string]: { deposit: number; withdraw: number } } = {};

        data.forEach(t => {
          const date = new Date(t.date);
          const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

          if (!groupedByMonth[key]) groupedByMonth[key] = { deposit: 0, withdraw: 0 };
          groupedByMonth[key][t.transaction_type] += formatAmountToNumber(t.amount);

          if (!lineGroupedByMonth[key]) lineGroupedByMonth[key] = { deposit: 0, withdraw: 0 };
          lineGroupedByMonth[key][t.transaction_type] += formatAmountToNumber(t.amount);
        });

        const monthlyTransactionComparisonData = Object.entries(groupedByMonth).map(([month, data]) => ({
          month,
          deposit: data.deposit,
          withdraw: data.withdraw,
        }));

        const monthlyTransactionData = Object.entries(lineGroupedByMonth).map(([month, data]) => ({
          month,
          deposit: data.deposit,
          withdraw: data.withdraw,
        }));

        setMonthlyTransactionComparisonData(monthlyTransactionComparisonData);
        setMonthlyTransactionData(monthlyTransactionData);

      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        toast.error("Erro ao carregar dados");
      }
    }

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardInfo value={formatAmount(summary.totalDeposit.toString())} title="Receitas" />
        <CardInfo value={formatAmount(summary.totalWithdraw.toString())} title="Despesas" />
        <CardInfo value={formatAmount(summary.totalBalance.toString())} title="Saldo Total" />
        <CardInfo value={summary.pendingTransactions.toString()} title="Transações Pendentes" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 rounded-xl shadow">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Comparativo de Receitas e Despesas por Mês</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTransactionComparisonData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="deposit" stackId="a" fill="var(--color-chart-1)" name="Receitas" />
                <Bar dataKey="withdraw" stackId="a" fill="var(--color-chart-2)" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-chart-1" />
                <span>Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-chart-2" />
                <span>Despesas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 rounded-xl shadow">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Evolução de Receitas e Despesas ao Longo do Tempo</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTransactionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="deposit" stroke="var(--color-chart-1)" name="Receitas" />
                <Line type="monotone" dataKey="withdraw" stroke="var(--color-chart-2)" name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 rounded-sm" style={{ backgroundColor: 'var(--color-chart-1)' }} />
                <span>Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 rounded-sm" style={{ backgroundColor: 'var(--color-chart-2)' }} />
                <span>Despesas</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
