import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const LoginInput = ({
  label,
  inputValue,
  onChange,
  inputAttributes,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const getInputType = () => {
    if (!isPassword) {
      return "text"
    } else {
      return showPassword ? "text" : "password"
    }
  }

  return (
    <div className="mb-5">
      <label htmlFor="email" className="block">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={getInputType()}
          value={inputValue}
          onChange={onChange}
          {...inputAttributes}
          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        {isPassword && (
          <button
            className="absolute px-5 text-gray-700 transform -translate-y-1/2 rounded-full top-1/2 right-2 bg-white-300 z-10"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  )
}

export default LoginInput
