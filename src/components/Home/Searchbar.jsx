import { FaSearch } from "react-icons/fa";

const Searchbar = ({ inputValue, setInputValue, handleSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
      <button
        onClick={handleSearch}
        className="inline-flex items-center rounded-r-full bg-blue-400 border border-slate-600 py-2 pl-3 pr-6"
      >
        <FaSearch className="text-2xl text-white" />
      </button>
    </div>
  );
};

export default Searchbar;
