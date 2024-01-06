import { useNavigate } from "react-router"

const BackHomeButton = () => {
  const navigate = useNavigate()
  const goToHome = () => navigate("/")
  return (
    <button
      className="mt-5 underline text-slate-600 hover:text-slate-500"
      onClick={goToHome}
    >
      Back to Home
    </button>
  )
}

export default BackHomeButton
