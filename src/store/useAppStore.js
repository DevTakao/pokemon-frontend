import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const states = {
  isLoggedIn: false,
  counter: 1,
}

export const useAppStore = create(
  persist(
    (set) => ({
      ...states,
      setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
    }),
    {
      name: "pokemon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
