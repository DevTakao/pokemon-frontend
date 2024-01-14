export const cartReducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      )

      if (existingItemIndex !== -1) {
        // Already exists
        const updatedCart = [...state.cartItems]
        updatedCart[existingItemIndex].quantity += action.payload.quantity

        return { ...state, cartItems: updatedCart }
      } else {
        // Not added yet
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }
    }

    case "REMOVE": {
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      )

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cartItems]
        updatedCart[existingItemIndex].quantity -= 1

        if (updatedCart[existingItemIndex].quantity <= 0) {
          updatedCart.splice(existingItemIndex, 1)
        }

        return { ...state, cartItems: updatedCart }
      } else {
        // Item not found, do nothing
        return state
      }
    }

    case "CLEAR": {
      return { ...state, cartItems: [] }
    }

    default:
      return state
  }
}
