import { useReducer, useState } from "react"
import { motion } from "framer-motion"

const ProductCard = ({ card }) => {
  const [quantity, setQuantity] = useState(1)

  const reducerFunc = (state, action) => {
    if (action.type === "ADD") {
      const existingItemIndex = state.card.findIndex(
        (cartItem) => cartItem.id === card.id
      )
      console.log("This is existingIndex= ", existingItemIndex)
      console.log("this is card: ", card)
      console.log("this is quantity: ", quantity)
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.card]
        updatedCart[existingItemIndex].quantity += state.quantity

        return { card: updatedCart, quantity: state.quantity }
      } else {
        return {
          card: [...state.card, { ...card, quantity: state.quantity }],
          quantity: state.quantity,
        }
      }
    }
  }

  const [state, dispatch] = useReducer(reducerFunc, {
    card: [],
    quantity: quantity,
  })

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="inline-block m-5 text-center border-black rounded-md shadow-2xl Item__Card"
    >
      <div className="w-full h-auto ">
        <img
          src={card.imageUrl}
          alt={card.imageAlt}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="font-serif italic">{card.description}</p>
      <p className="font-medium">US ${card.price}</p>
      <div className="text-lg font-md">
        <label>Quantity</label>
        <input
          value={state.quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          type="number"
          min="1"
          max="10"
          className="w-10 m-2 border"
        />
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: "ADD" })}
        className="w-1/2 px-2 py-2 mx-auto my-2 text-base text-white uppercase bg-blue-400 border rounded-full"
      >
        Add to Cart
      </button>
    </motion.div>
  )
}

export default ProductCard
