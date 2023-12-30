import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex justify-between">
      <input
        value={value}
        onChange={onChange}
        className="w-full px-6 py-2 border-2 border-green-300 rounded-l-full"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
      />
      <button
        className="px-5 text-green-700 bg-green-300 rounded-r-full"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  )
}

export default PasswordInput
