import { ImCross } from "react-icons/im"

const CurrentResultText = ({ activeSearchValue, clear }) => {
  return activeSearchValue ? (
    <div className="flex mb-2 text-blue-400">
      <p>Showing results for : {activeSearchValue}</p>
      <button
        className="flex px-3 ml-2 border border-black rounded-full"
        onClick={clear}
      >
        <ImCross className="m-auto" /> Clear
      </button>
    </div>
  ) : null
}

export default CurrentResultText
