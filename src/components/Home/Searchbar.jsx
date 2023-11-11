import { useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { POKEMON_TYPES } from "../../../constants"
import { Tooltip } from "react-tooltip"

const Searchbar = ({
  inputValue,
  setInputValue,
  selectedType,
  setSelectedType,
  handleSearch,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  useEffect(() => {
    console.log("selectedType:", selectedType)
  }, [selectedType])

  return (
    <div className="flex justify-center items-center mb-10">
      <input
        placeholder="Enter Pokemon Name"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        name="searchInput"
        className="pl-6 pr-3 py-2 rounded-l-full border border-slate-600 bg-slate-200 focus:outline-none"
      />
      <Tooltip id="search-tooltip" />
      <button
        data-tooltip-id="search-tooltip"
        data-tooltip-content="Search"
        onClick={handleSearch}
        className="inline-flex items-center rounded-r-full bg-blue-400 border border-slate-600 py-2 pl-3 pr-6"
      >
        <FaSearch className="text-2xl text-white" />
      </button>
      <select
        onChange={(e) => setSelectedType(e.target.value)}
        className="bg-blue-200 rounded-full px-4 py-2 mx-3"
      >
        {POKEMON_TYPES.map((type, i) => (
          <option key={i}>{type}</option>
        ))}
      </select>
    </div>
  )
}

export default Searchbar
