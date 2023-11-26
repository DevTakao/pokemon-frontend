import axios from "axios"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  })

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    password: false,
    passwordConfirmation: false,
  })

  const [error, setError] = useState("")

  const changePassword = async () => {
    try {
      const jwt = localStorage.getItem("jwtToken")
      await axios.post(`${API_URL}/auth/change-password`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    } catch (err) {
      console.log("err", err)
      const errorRes = err.response
      const errorMsg = errorRes.data.error.message
      setError(errorMsg)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    await changePassword()
  }

  return (
    <div className="p-10 my-10 border border-gray-300">
      <h2 className="my-5 text-xl font-medium text-center">Change Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First input with eye icon */}
        <div className="flex justify-between">
          <input
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            name="currentPassword"
            className="w-full px-6 py-2 border-2 border-green-300 rounded-l-full"
            type={showPassword.currentPassword ? "text" : "password"}
            placeholder="Your current password"
          />
          <button
            className="px-5 text-green-700 bg-green-300 rounded-r-full"
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                currentPassword: !prev.currentPassword,
              }))
            }
          >
            {!showPassword.currentPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <div className="flex justify-between">
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            name="password"
            className="w-full px-6 py-2 border-2 border-green-300 rounded-l-full"
            type={showPassword.password ? "text" : "password"}
            placeholder="Your new password"
          />
          <button
            className="px-5 text-green-700 bg-green-300 rounded-r-full"
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
          >
            {!showPassword.password ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <div className="flex justify-between">
          <input
            value={formData.passwordConfirmation}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                passwordConfirmation: e.target.value,
              }))
            }
            name="passwordConfirmation"
            className="w-full px-6 py-2 border-2 border-green-300 rounded-l-full"
            type={showPassword.passwordConfirmation ? "text" : "password"}
            placeholder="Your new password again"
          />
          <button
            className="px-5 text-green-700 bg-green-300 rounded-r-full"
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                passwordConfirmation: !prev.passwordConfirmation,
              }))
            }
          >
            {!showPassword.passwordConfirmation ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {error && <p className="text-red-300 font-sm">{error}</p>}
        <button
          type="submit"
          className="self-center inline-block px-5 py-2 mr-5 text-white bg-pink-400 rounded-full"
        >
          Change Password
        </button>
      </form>
    </div>
  )
}

export default PasswordForm
