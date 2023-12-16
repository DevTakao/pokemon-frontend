import { useState } from "react"
import { useAppStore } from "../../store/useAppStore"

const ProductCard = ({ card }) => {
  const { addToCart } = useAppStore()
  const [quantity, setQuantity] = useState(1)

  const doAddToCart = () => addToCart(card, quantity)

  return (
    <div className="inline-block m-5 text-center border shadow-2xl Item__Card border-black-200">
      <div className="w-full h-auto">
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
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          type="number"
          min="1"
          max="10"
          className="w-10 m-2 border"
        />
      </div>
      <button
        type="button"
        onClick={doAddToCart}
        className="w-1/2 px-2 py-2 mx-auto my-2 text-base text-white uppercase bg-blue-400 border rounded-full"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
