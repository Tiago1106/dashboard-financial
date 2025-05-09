import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Transaction } from '@/utils/dashboard/types';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  limit: number;
}

const TransactionsTable = ({ transactions, isLoading, limit }: TransactionsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Conta</TableHead>
          <TableHead>Indústria</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Tipo de Transação</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Moeda</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 7 }).map((__, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-[22px] w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))
          : transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.account}</TableCell>
              <TableCell>{transaction.industry}</TableCell>
              <TableCell>{transaction.state}</TableCell>
              <TableCell>
                <Badge variant="default" className={`uppercase ${transaction.transaction_type === "deposit" ? "bg-badge-deposit" : "bg-badge-withdraw"}`}>
                  {transaction.transaction_type === "deposit" ? "Depósito" : "Saque"}
                </Badge>
              </TableCell>
              <TableCell>{`R$ ${transaction.amount}`}</TableCell>
              <TableCell className="uppercase">{transaction.currency}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
