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

  const handleSearchClick = () => {
    handleSearch()
  }

  return (
    <div className="flex items-center justify-center mb-10">
      <input
        placeholder="Enter Pokemon Name"
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        name="searchInput"
        className="py-2 pl-6 pr-3 border rounded-l-full border-slate-600 bg-slate-200 focus:outline-none"
      />
      <Tooltip id="search-tooltip" />
      <button
        data-tooltip-id="search-tooltip"
        data-tooltip-content="Search"
        onClick={handleSearchClick}
        className="inline-flex items-center py-2 pl-3 pr-6 bg-blue-400 border rounded-r-full border-slate-600"
      >
        <FaSearch className="text-2xl text-white" />
      </button>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="px-4 py-2 mx-3 bg-blue-200 rounded-full"
      >
        {POKEMON_TYPES.map((type, i) => (
          <option key={i}>{type}</option>
        ))}
      </select>
    </div>
  )
}

export default Searchbar
