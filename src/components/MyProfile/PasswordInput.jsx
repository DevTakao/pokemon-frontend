import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordInput = ({
  value,
  onChange,
  showPassword,
  onToggleShowPassword,
  placeholder,
}) => {
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
        onClick={onToggleShowPassword}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  )
}

export default PasswordInput
