import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const states = {
  isLoggedIn: false,
  cart: [],
}

// cart: ["1", "1", "2"]
// cart: ["1", ... akhu 90]
// Best Scenario => cart: [ { itemId: "1", quantity: 90 }, { itemId: "2", quantity: 1 }]
// const total = cart.reduce((a, b) => (a.quantity || a) + b.quantity)
// total >= 10 ? "9+" : total

export const useAppStore = create(
  persist(
    (set) => ({
      ...states,
      _clearStore: () => set(states),
      setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),

      addToCart: (card, quantity) => {
        set((prev) => {
          const existingItemIndex = prev.cart.findIndex(
            (cartItem) => cartItem.id === card.id
          )
          console.log("This is existingIndex= ", existingItemIndex)

          if (existingItemIndex !== -1) {
            const updatedCart = [...prev.cart]
            updatedCart[existingItemIndex].quantity += quantity

            return { cart: updatedCart }
          } else {
            return {
              cart: [...prev.cart, { ...card, quantity: quantity }],
            }
          }
        })
      },

      removeItem: (cardId) => {
        // set((prev) => ({
        //   cart: prev.cart.filter((cartItem) => cartItem.id !== cardId),
        // }))
        set((prev) => {
          const existingItemIndex = prev.cart.findIndex(
            (cartItem) => cartItem.id === cardId
          )
          console.log("This is existingIndex= ", existingItemIndex)

          if (existingItemIndex !== -1) {
            const updatedCart = [...prev.cart]
            if (updatedCart[existingItemIndex].quantity === 1) {
              return {
                cart: prev.cart.filter((cartItem) => cartItem.id !== cardId),
              }
            } else {
              updatedCart[existingItemIndex].quantity -= 1
              return { cart: updatedCart }
            }
          }
        })
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "pokemon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
