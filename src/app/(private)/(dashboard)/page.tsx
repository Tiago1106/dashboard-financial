'use client'

import { CardInfo } from "@/components/card-info";
import { formatAmount } from "@/utils/formats";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { CustomTooltip } from "@/components/tooltip-chats";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardInfo value={formatAmount((data?.summary?.totalDeposit ?? 0).toString())} title="Receitas" isLoading={isLoading} />
        <CardInfo value={formatAmount((data?.summary?.totalWithdraw ?? 0).toString())} title="Despesas" isLoading={isLoading} />
        <CardInfo value={formatAmount((data?.summary?.totalBalance ?? 0).toString())} title="Saldo Total" isLoading={isLoading} />
        <CardInfo value={data?.summary?.pendingTransactions.toString() ?? '0'} title="Transações Pendentes" isLoading={isLoading} />  
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 rounded-xl shadow">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Comparativo de Receitas e Despesas por Mês</h2>
            {isLoading ? <Skeleton className="w-full h-75" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data?.monthlyTransactionComparisonData ?? []}>
                <XAxis dataKey="month" tickFormatter={(value) => format(new Date(value), 'MM/yyyy')} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="deposit" stackId="a" fill="var(--color-chart-1)" name="Receitas" />
                <Bar dataKey="withdraw" stackId="a" fill="var(--color-chart-2)" name="Despesas" />
              </BarChart>
              </ResponsiveContainer>
            )}
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
            {isLoading ? <Skeleton className="w-full h-75" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data?.monthlyTransactionData ?? []}>
                  <XAxis dataKey="month" tickFormatter={(value) => format(new Date(value), 'MM/yyyy')} />
                  <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="deposit" stroke="var(--color-chart-1)" name="Receitas" />
                <Line type="monotone" dataKey="withdraw" stroke="var(--color-chart-2)" name="Despesas" />
                </LineChart>
              </ResponsiveContainer>
            )}
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