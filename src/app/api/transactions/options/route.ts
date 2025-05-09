import { NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

type Transaction = {
  date: number
  amount: string
  transaction_type: string
  currency: string
  account: string
  industry: string
  state: string
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/transactions.json');

    const fileData = await fs.readFile(filePath, "utf-8")
    const transactions: Transaction[] = JSON.parse(fileData)

    const states = [...new Set(transactions.map(t => t.state))].sort()
    const accounts = [...new Set(transactions.map(t => t.account))].sort()
    const industries = [...new Set(transactions.map(t => t.industry))].sort()

    return NextResponse.json({
      states,
      accounts,
      industries,
    })
  } catch (error) {
    console.error("Erro ao carregar os filtros:", error)
    return new NextResponse("Erro interno ao processar os dados", { status: 500 })
  }
}
