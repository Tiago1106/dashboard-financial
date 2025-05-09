"use client"

import { useEffect, useState } from "react";
import ky from "ky";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Card, CardContent } from "@/components/ui/card";  // Supondo que você tenha esse componente de Card

interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

// Interface para os dados mensais de transações
interface MonthlyTransactionData {
  month: string;
  deposit: number;
  withdraw: number;
}

// Interface para os dados de comparação de transações mensais (para gráfico de barras empilhadas)
interface MonthlyTransactionComparisonData {
  month: string;
  deposit: number;
  withdraw: number;
}

function formatAmount(value: string): string {
  const number = parseFloat(value) / 100; // Converte para valor correto de reais
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL', // Define a moeda como Real Brasileiro
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatAmountToNumber(value: string): number {
  return parseFloat(value) / 100;  // Converte para o valor real (sem formatação)
}

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalDeposit: 0,
    totalWithdraw: 0,
    totalBalance: 0,
    pendingTransactions: 0,  // Para as transações pendentes
  });

  const [monthlyTransactionData, setMonthlyTransactionData] = useState<MonthlyTransactionData[]>([]);  // Dados para o gráfico de linhas
  const [monthlyTransactionComparisonData, setMonthlyTransactionComparisonData] = useState<MonthlyTransactionComparisonData[]>([]);  // Dados para o gráfico de barras empilhadas

  useEffect(() => {
    async function load() {
      try {
        const data = await ky.get("/data/transactions.json").json<Transaction[]>();
        
        // Filtrando as transações de depósito e saque
        const deposits = data.filter(t => t.transaction_type === "deposit");
        const withdraws = data.filter(t => t.transaction_type === "withdraw");

        // Calculando as receitas, despesas e saldo total
        const totalDeposit = deposits.reduce((acc: number, t: Transaction) => acc + formatAmountToNumber(t.amount), 0);
        const totalWithdraw = withdraws.reduce((acc: number, t: Transaction) => acc + formatAmountToNumber(t.amount), 0);
        const totalBalance = totalDeposit - totalWithdraw;

        // Definindo as transações pendentes como aquelas com data futura
        const pendingTransactions = data.filter(t => t.date > Date.now()).length;

        setSummary({
          totalDeposit,
          totalWithdraw,
          totalBalance,
          pendingTransactions,  // Atualizando o número de transações pendentes
        });

        // Processando os dados para os gráficos
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

        // Convertendo para os dados para os gráficos
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
      }
    }

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p>Receitas</p>
            <p className="text-xl font-semibold">{formatAmount(summary.totalDeposit.toString())}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>Despesas</p>
            <p className="text-xl font-semibold">{formatAmount(summary.totalWithdraw.toString())}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>Saldo Total</p>
            <p className="text-xl font-semibold">{formatAmount(summary.totalBalance.toString())}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>Transações Pendentes</p>
            <p className="text-xl font-semibold">{summary.pendingTransactions}</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras Empilhadas */}
        <Card className="p-4 rounded-xl shadow">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Comparativo de Receitas e Despesas por Mês</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTransactionComparisonData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deposit" stackId="a" fill="#4ade80" name="Receitas" />
                <Bar dataKey="withdraw" stackId="a" fill="#f87171" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Linhas */}
        <Card className="p-4 rounded-xl shadow">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Evolução de Receitas e Despesas ao Longo do Tempo</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTransactionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="deposit" stroke="#4ade80" name="Receitas" />
                <Line type="monotone" dataKey="withdraw" stroke="#f87171" name="Despesas" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
