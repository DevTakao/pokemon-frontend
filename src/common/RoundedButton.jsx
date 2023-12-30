const RoundedButton = ({ label, type, handleClick, customStyles }) => {
  return (
    <button
      onClick={handleClick || (() => {})}
      type={type || "button"}
      className={`block py-4 mx-auto text-white bg-pink-400 rounded-full px-7 ${customStyles}`}
    >
      {label}
    </button>
  )
}

export default RoundedButton
