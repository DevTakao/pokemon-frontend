import { useEffect, useState } from "react"
import { useParams } from "react-router"
import MissingNoImage from "../../assets/missingno.png"
import Loading from "../../common/Loading"
import PokemonEditForm from "./PokemonEditForm"
import ConfirmDeletePopup from "./ConfirmDeletePopup"
import BackHomeButton from "../../common/BackHomeButton"
import PokemonDetails from "./PokemonDetails"
import useAPI from "../../hooks/useAPI"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const DetailPage = () => {
  const { id } = useParams() // parameter

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pokemon, setPokemon] = useState({
    imageUrl: MissingNoImage,
    name: "MissingNo",
    type: "???",
  })

  const [boxShow, setBoxShow] = useState(false)

  const toggleBoxShow = () => setBoxShow(!boxShow)

  const { action: showPokemon, error } = useAPI({
    method: "get",
    url: `${API_URL}/pokemons/${id}`,
  })

  const fetchDetails = async () => {
    setIsLoading(true)
    try {
      if (error) {
        throw error
      }
      const { data: res } = await showPokemon()
      const data = res.data.attributes
      setPokemon(data)
    } catch (err) {
      console.error(err)
      setErrorMessage(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const callFetchDetails = async () => {
      await fetchDetails()
    }

    callFetchDetails()
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-center">
      <BackHomeButton />
      <PokemonDetails pokemon={pokemon} />
      {!!errorMessage && <p className="my-5 text-red-400">{errorMessage}</p>}

      <ConfirmDeletePopup
        showBox={boxShow}
        setErrorMessage={setErrorMessage}
        fetchDetails={fetchDetails}
        onClose={toggleBoxShow}
      />

      {pokemon && (
        <PokemonEditForm
          initialValues={pokemon}
          setErrorMessage={setErrorMessage}
          fetchDetails={fetchDetails}
          handleDelete={toggleBoxShow}
        />
      )}
    </div>
  )
}
export default DetailPage
