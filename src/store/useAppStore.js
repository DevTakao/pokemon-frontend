import { create } from "zustand"

const states = {
  isLoggedIn: true,
  counter: 1,
}

export const useAppStore = create((set) => ({
  ...states,
  setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
}))
