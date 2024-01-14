import { motion } from "framer-motion"
import { useState } from "react"

const ProductCard = ({ card, handleAdd }) => {
  const [quantity, setQuantity] = useState(1) // input
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.valueAsNumber)}
          type="number"
          min="1"
          max="10"
          className="w-10 m-2 border"
        />
      </div>
      <button
        type="button"
        onClick={() => handleAdd({ ...card, quantity: quantity })}
        className="w-1/2 px-2 py-2 mx-auto my-2 text-base text-white uppercase bg-blue-400 border rounded-full"
      >
        Add to Cart
      </button>
    </motion.div>
  )
}

export default ProductCard
