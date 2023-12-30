import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAppStore } from "../store/useAppStore"
import LoginInput from "./LoginInput"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const LoginPage = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAppStore()

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleAfterLogin = async (response) => {
    setIsLoggedIn(true)
    const { jwt } = await response.data
    localStorage.setItem("jwtToken", jwt)
  }
  const goToHomePage = () => navigate("/")
  const redirectToLoginPage = () => navigate("/login")
  const showErrorMsg = (err) => {
    setError(err.message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/auth/local`, formData)

      if (response.status === 200) {
        // login success
        handleAfterLogin(response)
        goToHomePage()
      }
    } catch (err) {
      // login fail
      console.error("Error logging in:", err.message)
      redirectToLoginPage()
      showErrorMsg(err)
    }
  }

  return (
    <div className="Page__Container flex items-center justify-center min-h-screen bg-gray-300">
      <div className="Form__Container w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Login
        </h2>
        <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <LoginInput
              label={"Username"}
              inputValue={formData.identifier}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  identifier: e.target.value,
                }))
              }
              inputAttributes={{
                id: "email",
                name: "email",
                type: "email",
                autoComplete: "email",
                required: true,
                placeholder: "example@domain.com",
              }}
            />
            <LoginInput
              label={"Password"}
              inputValue={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              inputAttributes={{
                id: "password",
                name: "password",
                autoComplete: "password",
                required: true,
                placeholder: "Type your password here",
              }}
              isPassword={true}
            />
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-300 font-sm">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginPage
