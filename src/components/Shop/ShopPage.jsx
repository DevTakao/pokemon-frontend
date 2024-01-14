import { TfiShoppingCart } from "react-icons/tfi"
// import { useAppStore } from "../../store/useAppStore"
import ProductCard from "./ProductCard"
import { useEffect, useReducer, useState } from "react"
import CartModal from "./CartModal"
import { cartReducerFunc } from "./reducers/cartReducer"

const initialCartState = {
  cartItems: [],
}

// mock data
const cards = [
  {
    id: "1",
    imageUrl:
      "https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/194cf13511e64a99b4ab74a4d5319d88_Original.jpg",
    imageAlt: "Charizard",
    description: "Charizard Toy",
    price: "12.12",
  },
  {
    id: "2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnbr5dCOOQEhB8CfQY-ydECE2TbbXGlh9aLY3anPUzg&s",
    imageAlt: "Bulbasaur",
    description: "Bulbasaur Toy",
    price: "11.11",
  },
  {
    id: "3",
    imageUrl:
      "https://www.pokemoncenter.com/images/DAMRoot/Full-Size/10000/P5073_701-03991_01.jpg",
    imageAlt: "Squritle",
    description: "Squritle Toy",
    price: "13.13",
  },

  {
    id: "4",
    imageUrl:
      "https://wolvespokemart.co.uk/cdn/shop/products/plush-pikachu-logo_1200x1200.jpg?v=1607811506",
    imageAlt: "Pikachu",
    description: "Pikachu Toy",
    price: "20.23",
  },
  {
    id: "5",
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_ec58e002-031f-47bc-8cf4-60b25a782891?wid=488&hei=488&fmt=pjpeg",
    imageAlt: "Gengar",
    description: "Gengar Toy",
    price: "21.23",
  },
  {
    id: "6",
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_b19fae9c-21cd-440e-b5b0-c4d71f1a7fa9?wid=488&hei=488&fmt=pjpeg",
    imageAlt: "Jigglypuff",
    description: "Jigglypuff Toy",
    price: "10.13",
  },
]

const ShopPage = () => {
  const [state, dispatch] = useReducer(cartReducerFunc, initialCartState)

  // const { cart } = useAppStore()
  const [cartCount, setCartCount] = useState(0)
  const [open, setOpen] = useState(false)

  const toggleCart = () => setOpen(!open)

  // update count whenever cart is updated
  useEffect(() => {
    console.log("reducer state:", state)
    let result = 0

    state.cartItems.forEach((c) => (result += c.quantity))
    setCartCount(result)
  }, [state])

  return (
    <div>
      <div className="flex justify-end p-5 text-center">
        <CartModal
          open={open}
          closeModal={() => setOpen(false)}
          updateCart={dispatch}
          cartState={state}
        />
        <button className="relative z-0 flex">
          <div className="flex" onClick={toggleCart}>
            <TfiShoppingCart size={30} />
            <p className="text-xl">My Cart</p>
          </div>

          <div className="absolute top-0 left-0 -translate-x-[50%] -translate-y-[50%] flex justify-center w-[20px] h-[20px] bg-red-500 text-sm items-center text-white rounded-full">
            {cartCount >= 10 ? "9+" : cartCount}
          </div>
        </button>
      </div>
      <div className="text-center">
        <h2 className="py-5 text-2xl font-semibold tracking-widest text-blue-600 bg-blue-300">
          Soft Plushies
        </h2>
      </div>
      <div className="grid grid-cols-5">
        {cards.map((card, i) => (
          <ProductCard
            key={i}
            card={card}
            handleAdd={(payload) => dispatch({ type: "ADD", payload: payload })}
          />
        ))}
      </div>
    </div>
  )
}

export default ShopPage
