import axios from "axios"
import { useState } from "react"
import PasswordInput from "./PasswordInput"
import { getJwt } from "../../utility/jwt"
import ErrorMessage from "../../common/ErrorMessage"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const defaultFormState = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
}

const PasswordForm = () => {
  const [formData, setFormData] = useState(defaultFormState)

  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const changePassword = async () => {
    try {
      const jwt = getJwt()
      const res = await axios.post(
        `${API_URL}/auth/change-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      if (res.status === 200) {
        setSuccess("Changed password successfully")
        setFormData(defaultFormState)
      }
    } catch (err) {
      console.log("err", err)
      const errorRes = err.response
      const errorMsg = errorRes.data.error.message
      setError(errorMsg)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSuccess("")
    setError("")
    await changePassword()
  }

  return (
    <div className="p-10 my-10 border border-gray-300">
      <h2 className="my-5 text-xl font-medium text-center">Change Password</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
      >
        <PasswordInput
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
          placeholder="Your current password"
        />

        <PasswordInput
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Your new password"
        />

        <PasswordInput
          value={formData.passwordConfirmation}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              passwordConfirmation: e.target.value,
            }))
          }
          placeholder="Your new password again"
        />

        {error && <ErrorMessage message={error} />}
        {success && <p className="text-green-600 font-sm">{success}</p>}
        <button
          type="submit"
          className="self-center inline-block px-5 py-2 text-white bg-pink-400 rounded-full"
        >
          Change Password
        </button>
      </form>
    </div>
  )
}

export default PasswordForm
