"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DatePicker } from "@/components/date-picker"
import { CustomCombobox } from "./combobox"

import { fetchTransactionOptions } from "@/lib/dashboard"
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

  const [isSheetOpen, setSheetOpen] = useState(false)
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

  const handleCancelClick = () => {
    setSheetOpen(false)
  }

  const handleClearClick = () => {
    setSheetOpen(false)
    resetFilters()
    setData({
      date: undefined,
      account: "",
      industry: "",
      state: ""
    })
  }

  const handleApplyFiltersClick = () => {
    setSheetOpen(false)
    handleApplyFilters(data.date, data.account, data.industry, data.state)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full min-w-[300px]">
        <SheetHeader>
          <SheetTitle>Filtrar Transações</SheetTitle>
        </SheetHeader>

        <div className="w-full px-4 grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Data</label>
            <DatePicker
              date={data.date || date}
              onChange={(newDate: Date | undefined) => setData(prevData => ({ ...prevData, date: newDate }))}
            />
          </div>

          <CustomCombobox
            label="Estado"
            options={options?.states ?? []}
            value={data.state || state}
            onChange={(newState: string) => setData(prevData => ({ ...prevData, state: newState }))}
            placeholder="Selecione um estado"
          />

          <CustomCombobox
            label="Conta"
            options={options?.accounts ?? []}
            value={data.account || account}
            onChange={(newAccount: string) => setData(prevData => ({ ...prevData, account: newAccount }))}
            placeholder="Selecione uma conta"
          />

          <CustomCombobox
            label="Indústria"
            options={options?.industries ?? []}
            value={data.industry || industry}
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
