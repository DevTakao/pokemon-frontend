import { TfiShoppingCart } from "react-icons/tfi"
import { useAppStore } from "../../store/useAppStore"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"
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
  const { cart, clearCart } = useAppStore()
  const [cartCount, setCartCount] = useState(0)

  // update count whenever cart is updated
  useEffect(() => {
    let result = 0
    cart.forEach((c) => (result += c.quantity))
    console.log("result", result)

    setCartCount(result)
  }, [cart])

  return (
    <div>
      <div className="flex justify-end p-5 text-center">
        <div className="relative flex">
          <div className="flex cursor-pointer" onClick={clearCart}>
            <TfiShoppingCart size={30} />
            <p className="text-xl">My Cart</p>
          </div>

          <div className="absolute  top-0 left-0 -translate-x-[50%] -translate-y-[50%] flex justify-center w-[20px] h-[20px] bg-red-500 text-sm items-center text-white rounded-full">
            {cartCount >= 10 ? "9+" : cartCount}
          </div>
        </div>
      </div>
      <div className="bg-[#f4f4f4]">
        <h2 className="ml-2">Items</h2>
      </div>
      <div>
        {cards.map((card, i) => (
          <ProductCard key={i} card={card} />
        ))}
      </div>
    </div>
  )
}

export default ShopPage
