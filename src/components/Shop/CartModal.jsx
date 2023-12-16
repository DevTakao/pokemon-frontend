import { useAppStore } from "../../store/useAppStore"
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

const slideAnimation = {
  initial: {
    y: "-50%",
    x: "100%",
  },
  animate: {
    y: "-50%",
    x: 0,
  },
  exit: {
    y: "-50%",
    x: "100%",
  },
}

const fadeInAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
  },
}

const CartModal = ({ open, closeModal }) => {
  const { cart, clearCart } = useAppStore()

  const getTotalPrice = () => {
    let totalPrice = 0
    for (const cartItem of cart) {
      totalPrice += parseFloat(cartItem.price) * cartItem.quantity
    }
    return totalPrice.toFixed(2)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...slideAnimation}
          transition={{
            type: "keyframes",
          }}
          className="fixed z-50 top-[50%] right-0 w-80 max-w-md py-10 bg-white border-l-2 border-y-2 border-blue-200 rounded-l-lg shadow-2xl px-7"
        >
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="p-2 transition duration-700 hover:bg-gray-200 hover:rotate-180"
            >
              <FaTimes className="text-blue-500" />
            </button>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-left uppercase">
            My Cart
          </h2>
          {cart.length > 0 ? (
            <div
              className={`Cart_Content divide-y-2 divide-blue-300 py-2 h-[30vh] overflow-y-auto overflow-x-hidden`}
            >
              {cart.map((cartItem) => (
                <motion.div
                  key={cartItem.id}
                  {...fadeInAnimation}
                  className="grid grid-cols-2 py-2"
                >
                  <div>
                    <h3 className="font-medium text-left">
                      {cartItem.description}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-left pl-7">
                    <button>
                      <FaMinus />
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button>
                      <FaPlus />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-10 opacity-50">
              No items in cart
            </div>
          )}
          {cart.length > 0 && (
            <div className="flex items-center justify-center">
              <button className="underline" onClick={clearCart}>
                Clear All
              </button>
            </div>
          )}
          <div className="px-5 py-4 mt-2 text-white bg-blue-500">
            <b className="text-lg font-bold">Total Price:</b> ${getTotalPrice()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartModal
