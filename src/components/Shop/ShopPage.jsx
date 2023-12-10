import { TfiShoppingCart } from "react-icons/tfi"
import { useAppStore } from "../../store/useAppStore"
import { useState } from "react"
// mock data
const cards = [
  {
    id: "1",
    imageUrl:
      "https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/194cf13511e64a99b4ab74a4d5319d88_Original.jpg",
    imageAlt: "Charizard",
    description: "Charizard Toy",
    price: "12.12$",
  },
  {
    id: "2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnbr5dCOOQEhB8CfQY-ydECE2TbbXGlh9aLY3anPUzg&s",
    imageAlt: "Bulbasaur",
    description: "Bulbasaur Toy",
    price: "11.11$",
  },
  {
    id: "3",
    imageUrl:
      "https://www.pokemoncenter.com/images/DAMRoot/Full-Size/10000/P5073_701-03991_01.jpg",
    imageAlt: "Squritle",
    description: "Squritle Toy",
    price: "13.13$",
  },

  {
    id: "4",
    imageUrl:
      "https://wolvespokemart.co.uk/cdn/shop/products/plush-pikachu-logo_1200x1200.jpg?v=1607811506",
    imageAlt: "Pikachu",
    description: "Pikachu Toy",
    price: "20.23$",
  },
]

const ShopPage = () => {
  const { cart, addToCart, clearCart } = useAppStore()

  console.log("this is cart value", cart)

  const [amount, setAmount] = useState({})

  const handleAmount = (cardId, quantity) => {
    //switch string into number
    const quantityValue = parseInt(quantity, 10)

    setAmount((prev) => ({
      ...prev,
      [cardId]: quantityValue,
    }))
  }

  const submitHandler = (e, cardId) => {
    console.log("card Id =", cardId)
    e.preventDefault()
    addToCart(cardId, amount[cardId])
    setAmount("")
  }

  return (
    <div>
      <div className="flex justify-end text-center p-5">
        <div className="flex relative">
          <div className="flex cursor-pointer" onClick={clearCart}>
            <TfiShoppingCart size={30} />
            <p className="text-xl">My Cart</p>
          </div>

          <div className="absolute  top-0 left-0 -translate-x-[50%] -translate-y-[50%] flex justify-center w-[20px] h-[20px] bg-red-500 text-sm items-center text-white rounded-full">
            {cart.length >= 10 ? "9+" : cart.length}
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4]">
        <h2 className="ml-2">Items</h2>
      </div>
      <div>
        {cards.map((card, i) => (
          <div
            className="Item__Card inline-block text-center shadow-2xl border border-black-200 m-10"
            key={i}
          >
            <div className="w-[200px] h-auto">
              <img
                src={card.imageUrl}
                alt={card.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-serif italic">{card.description}</p>
            <p className="font-medium">US {card.price}</p>
            <form action="" onSubmit={(e) => submitHandler(e, card.id)}>
              <div className="text-lg font-md">
                <label>Quantity</label>
                <input
                  value={amount[card.id] || ""}
                  onChange={(e) => handleAmount(card.id, e.target.value)}
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  className="w-10 m-2 border"
                />
              </div>
              <button
                type="submit"
                className="px-2 ml-2 my-2 uppercase text-lg bg-red-400 border border-black rounded-full"
              >
                Add to Cart
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
// hello

export default ShopPage
