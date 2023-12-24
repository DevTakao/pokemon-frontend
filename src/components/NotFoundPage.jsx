import { useNavigate } from "react-router"
import EmptyPokeball from "../assets/pokeball-open.jpg"

const NotFoundPage = () => {
  const navigate = useNavigate()
  const goBackHome = () => navigate("/")
  return (
    <div>
      <div className="Center__Image w-[300px] mx-auto rounded-full mt-10 overflow-hidden">
        <img
          src={EmptyPokeball}
          alt="empty pokeball"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-center text-3xl text-red-400 font-bold mt-10 mb-5">
        404 Not Found
      </h1>
      <p className="text-center">
        Oops! This page does not exist. Go back to home?
      </p>
      <button
        type="button"
        onClick={goBackHome}
        className="block rounded-full py-3 px-4 border border-black bg-slate-500 hover:bg-white text-white hover:text-black mx-auto mt-10"
      >
        Back to Home
      </button>
    </div>
  )
}

export default NotFoundPage
