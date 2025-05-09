import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface TransactionFilterState {
  date: Date | undefined
  account: string
  industry: string
  state: string
  setDate: (date: Date | undefined) => void
  setAccount: (account: string) => void
  setIndustry: (industry: string) => void
  setState: (state: string) => void
  setAllFilters: (date: Date | undefined, account: string, industry: string, state: string) => void
  resetFilters: () => void
}

export const useTransactionFilterStore = create<TransactionFilterState>()(
  persist(
    (set) => ({
      date: undefined,
      account: "",
      industry: "",
      state: "",
      setDate: (date) => set({ date }),
      setAccount: (account) => set({ account }),
      setIndustry: (industry) => set({ industry }),
      setState: (state) => set({ state }),
      setAllFilters: (date, account, industry, state) => set({ date, account, industry, state }),
      resetFilters: () => set({ date: undefined, account: "", industry: "", state: "" }),
    }),
    {
      name: "transaction-filters",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
