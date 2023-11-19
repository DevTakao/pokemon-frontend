import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAppStore } from "../store/useAppStore"

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("log in with", formData)

    try {
      const response = await axios.post(`${API_URL}/auth/local`, formData)

      if (response.status === 200) {
        // login success
        setIsLoggedIn(true)
        const { jwt } = await response.data
        localStorage.setItem("jwtToken", jwt)
        navigate("/")
      }
    } catch (error) {
      console.error("Error logging in:", error.message)
      navigate("/login")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Login{" "}
        </h2>
        <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="mb-5">
              <label htmlFor="email" className="block">
                Username
              </label>
              <input
                value={formData.identifier}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    identifier: e.target.value,
                  }))
                }
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example@domain.com"
              />
            </div>
            <div className="mb-10">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Type your password here"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
