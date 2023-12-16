import { useState } from "react"
import { useAppStore } from "../../store/useAppStore"

const ProductCard = ({ card }) => {
  const { addToCart } = useAppStore()
  const [quantity, setQuantity] = useState(1)

  const doAddToCart = () => addToCart(card.id, quantity, card.price)

  return (
    <div className="inline-block m-10 text-center border shadow-2xl Item__Card border-black-200">
      <div className="w-[200px] h-auto">
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
        className="px-2 my-2 ml-2 text-lg uppercase bg-red-400 border border-black rounded-full"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
