import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../../common/Loading"
import PokemonCard from "./PokemonCard"
import Pagination from "../../common/Pagination"
import { useNavigate } from "react-router"
import Searchbar from "./Searchbar"
import { ImCross } from "react-icons/im"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const HomePage = () => {
  const pageSize = 5

  const [data, setData] = useState([])
  // const [pageNo, setPageNo] = useState(1)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pageCount, setPageCount] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // query
  const [inputValue, setInputValue] = useState("") // input box data
  const [selectedType, setSelectedType] = useState("ANY") // input dropdown data
  const [queryParams, setQueryParams] = useState({
    activeSearchValue: "",
    selectedType: "ANY",
    pageNo: 1,
  }) // search parameters

  const navigate = useNavigate()

  const calcPageCount = () => {
    const pc = Math.ceil(totalItems / pageSize)
    setPageCount(pc)
  }

  const fetchData = async () => {
    console.log("call fetchData")
    try {
      setErrorMessage("")
      setIsLoading(true)

      const { activeSearchValue, selectedType, pageNo } = queryParams

      const { data: res } = await axios.get(
        `${API_URL}/pokemons?filters[name][$containsi]=${activeSearchValue}&${
          selectedType === "ANY" ? "" : `filters[type][$eqi]=${selectedType}&`
        }pagination[pageSize]=${pageSize}&pagination[page]=${pageNo}&sort[0]=name:asc`
      )

      const data = res.data
      const pagination = res.meta.pagination

      setData(data)
      setIsFirstPage(pagination.page === 1)
      setIsLastPage(pagination.page === pagination.pageCount)
      setTotalItems(pagination.total)
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.log("Error")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    console.log(inputValue, selectedType)
    setQueryParams((prev) => ({
      ...prev,
      activeSearchValue: inputValue,
      selectedType: selectedType,
    }))
  }

  const searchClear = () => {
    setQueryParams({
      activeSearchValue: "",
      selectedType: "ANY",
      pageNo: 1,
    })
    setInputValue("")
    setSelectedType("ANY")
  }

  const goPrev = () => {
    setQueryParams((prev) => ({ ...prev, pageNo: prev.pageNo - 1 }))
  }

  const goNext = () => {
    setQueryParams((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }))
  }

  const goToPage = (pageNo) => {
    setQueryParams((prev) => ({ ...prev, pageNo: pageNo }))
  }

  const goToDetails = (id) => {
    navigate(`/pokemon/${id}`)
  }

  const goToCreatePage = () => {
    navigate("/pokemon/create")
  }

  useEffect(() => {
    calcPageCount()
  }, [data])

  useEffect(() => {
    const callFetchData = async () => {
      await fetchData()
    }

    callFetchData()
  }, [queryParams, pageSize])

  return (
    <div className="p-20">
      <Searchbar
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSearch={handleSearch}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {queryParams.activeSearchValue && (
        <div className="flex mb-2 text-blue-400">
          <p>Showing results for : {queryParams.activeSearchValue}</p>
          <button
            className="flex px-3 ml-2 border border-black rounded-full"
            onClick={searchClear}
          >
            <ImCross className="m-auto" /> Clear
          </button>
        </div>
      )}

      {isLoading && <Loading />}
      {!!errorMessage && <p className="my-5 text-red-400">{errorMessage}</p>}

      <Pagination
        pageCount={pageCount}
        goPrev={goPrev}
        goNext={goNext}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        handlePageChange={(pageNo) => goToPage(pageNo)}
        currentPage={queryParams.pageNo}
      />

      {data.length > 0 ? (
        <div className="flex flex-col justify-center my-10">
          {Array.isArray(data) &&
            data.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                fetchData={fetchData}
                handleClick={() => goToDetails(pokemon.id)}
              />
            ))}
        </div>
      ) : (
        <p className="my-10 text-center">No results found.</p>
      )}

      <button
        onClick={goToCreatePage}
        type="button"
        className="block py-4 mx-auto text-white bg-pink-400 rounded-full px-7"
      >
        Create
      </button>
    </div>
  )
}

export default HomePage
