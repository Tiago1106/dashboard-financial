import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

interface Transaction {
  date: number;
  amount: string;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  // Função para formatar a data
  console.log(transactions);

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
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.account}</TableCell>
            <TableCell>{transaction.industry}</TableCell>
            <TableCell>{transaction.state}</TableCell>
            <TableCell>{transaction.transaction_type}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.currency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
