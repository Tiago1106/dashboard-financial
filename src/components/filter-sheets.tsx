"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DatePicker } from "@/components/date-picker"
import { useQuery } from "@tanstack/react-query"
import { fetchTransactionOptions } from "@/lib/dashboard"
import { CustomCombobox } from "./combobox"
import { useState } from "react"
import { useTransactionFilterStore } from "@/store/useTransactionFilterStore"

interface TransactionFilterSheetProps {
  handleApplyFilters: (data: Date | undefined, account: string, industry: string, state: string) => void
}

export function TransactionFilterSheet({
  handleApplyFilters,
}: TransactionFilterSheetProps) {
  const { data: options } = useQuery({
    queryKey: ["transaction-options"],
    queryFn: fetchTransactionOptions,
  })

  const { resetFilters, date, account, industry, state } = useTransactionFilterStore()

  const [data, setData] = useState<{
    date: Date | undefined,
    account: string,
    industry: string,
    state: string
  }>({
    date: date,
    account: account,
    industry: industry,
    state: state
  })


  const [isSheetOpen, setSheetOpen] = useState(false)

  const handleCancelClick = () => {
    setSheetOpen(false)
  }

  const handleClearClick = () => {
    resetFilters()
    setData({
      date: undefined,
      account: "",
      industry: "",
      state: ""
    })
  }

  const handleApplyFiltersClick = () => {
    handleApplyFilters(data.date, data.account, data.industry, data.state)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Filtrar</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filtrar Transações</SheetTitle>
        </SheetHeader>

        <div className="w-full px-4 grid gap-4">
          {/* Data */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Data</label>
            <DatePicker
              date={data.date}
              onChange={(newDate: Date | undefined) => setData(prevData => ({ ...prevData, date: newDate }))}
            />
          </div>

          {/* Conta */}
          <CustomCombobox
            label="Estado"
            options={options?.states ?? []}
            value={data.state}
            onChange={(newState: string) => setData(prevData => ({ ...prevData, state: newState }))}
            placeholder="Selecione um estado"
          />

          <CustomCombobox
            label="Conta"
            options={options?.accounts ?? []}
            value={data.account}
            onChange={(newAccount: string) => setData(prevData => ({ ...prevData, account: newAccount }))}
            placeholder="Selecione uma conta"
          />

          <CustomCombobox
            label="Indústria"
            options={options?.industries ?? []}
            value={data.industry}
            onChange={(newIndustry: string) => setData(prevData => ({ ...prevData, industry: newIndustry }))}
            placeholder="Selecione uma indústria"
          />

          <div className="flex flex-row gap-4 mt-4 justify-between">
            <Button variant="outline" onClick={handleClearClick}>Limpar</Button>
            <div className="flex flex-row gap-4">
              <Button variant="outline" onClick={handleCancelClick}>Cancelar</Button>
              <Button onClick={() => handleApplyFiltersClick()}>Aplicar Filtros</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
