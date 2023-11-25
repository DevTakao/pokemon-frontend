import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const states = {
  isLoggedIn: false,
}

export const useAppStore = create(
  persist(
    (set) => ({
      ...states,
      _clearStore: () => set(states),
      setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
    }),
    {
      name: "pokemon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
