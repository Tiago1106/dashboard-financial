import { User } from "firebase/auth"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)