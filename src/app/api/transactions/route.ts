import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Transaction } from '@/utils/dashboard/types';
import { formatAmount, formatDate } from '@/utils/formats';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const filePath = path.join(process.cwd(), 'public/data/transactions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: Transaction[] = JSON.parse(fileContent);

    // Paginação
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);

    // Formatar data e valor
    const formattedData = paginatedData.map((transaction) => ({
      ...transaction,
      date: formatDate(transaction.date),
      amount: formatAmount(transaction.amount),
    }));

    return NextResponse.json({
      transactions: formattedData,
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    return NextResponse.json(
      { error: 'Erro ao carregar os dados' },
      { status: 500 }
    );
  }
}