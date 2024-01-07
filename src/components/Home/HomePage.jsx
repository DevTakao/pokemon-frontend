// import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../../common/Loading"
import PokemonCard from "./PokemonCard"
import Pagination from "../../common/Pagination"
import { useNavigate } from "react-router"
import Searchbar from "./Searchbar"
import CurrentResultText from "./CurrentResultText"
import ErrorMessage from "../../common/ErrorMessage"
import RoundedButton from "../../common/RoundedButton"
// import { getJwt } from "../../utility/jwt"
import qs from "qs"
import { goNext, goPrev, goToPage } from "./helpers/paginationFns"
import useAPI from "../../hooks/useAPI"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const HomePage = () => {
  const pageSize = 5
  const defaultQueryParams = {
    activeSearchValue: "",
    selectedType: "ANY",
    pageNo: 1,
  }
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [isLastPage, setIsLastPage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pageCount, setPageCount] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  // query
  const [inputValue, setInputValue] = useState("") // input box data
  const [selectedType, setSelectedType] = useState("ANY") // input dropdown data
  const [queryParams, setQueryParams] = useState(defaultQueryParams) // search parameters

  // custom hook
  const { activeSearchValue, selectedType: qpType, pageNo } = queryParams
  const params = {
    filters: {
      name: { $containsi: activeSearchValue },
      type: qpType === "ANY" ? undefined : { $eqi: qpType },
    },
    pagination: {
      pageSize: pageSize,
      page: pageNo,
    },
    sort: ["name:asc"],
  }

  const queryString = qs.stringify(params, { encodeValuesOnly: true })

  const { action: fetchAction } = useAPI({
    method: "get",
    url: `${API_URL}/pokemons?${queryString}`,
  })

  const calcPageCount = () => {
    const pc = Math.ceil(totalItems / pageSize)
    setPageCount(pc)
  }

  const fetchData = async () => {
    try {
      setErrorMessage("")
      setIsLoading(true)

      const { data: response } = await fetchAction()
      const data = response.data
      const pagination = response.meta.pagination

      setData(data)
      setIsFirstPage(pagination.page === 1)
      setIsLastPage(pagination.page === pagination.pageCount)
      setTotalItems(pagination.total)
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    setQueryParams((prev) => ({
      ...prev,
      activeSearchValue: inputValue,
      selectedType: selectedType,
    }))
  }

  const searchClear = () => {
    setQueryParams(defaultQueryParams)
    setInputValue("")
    setSelectedType("ANY")
  }

  const goTo = (page) => {
    navigate(`/pokemon/${page}`)
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
      <CurrentResultText
        activeSearchValue={queryParams.activeSearchValue}
        clear={searchClear}
      />
      <Loading show={isLoading} />
      <ErrorMessage message={errorMessage} />
      <Pagination
        goPrev={() => goPrev({ set: setQueryParams })}
        goNext={() => goNext({ set: setQueryParams })}
        handlePageChange={(pageNo) =>
          goToPage({ set: setQueryParams, pageNo: pageNo })
        }
        pageCount={pageCount}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
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
                handleClick={() => goTo(pokemon.id)}
              />
            ))}
        </div>
      ) : (
        <p className="my-10 text-center">No results found.</p>
      )}

      <RoundedButton label="Create" handleClick={() => goTo("create")} />
    </div>
  )
}

export default HomePage
