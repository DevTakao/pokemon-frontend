import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import MissingNoImage from "../../assets/missingno.png"
import Loading from "../../common/Loading"
import PokemonEditForm from "./PokemonEditForm"
import ConfirmDeletePopup from "./ConfirmDeletePopup"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const DetailPage = () => {
  const { id } = useParams() // parameter
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pokemon, setPokemon] = useState({
    imageUrl: MissingNoImage,
    name: "MissingNo",
    type: "???",
  })

  const [boxShow, setBoxShow] = useState(false)

  const toggleBoxShow = () => setBoxShow(!boxShow)
  console.log("boxshow = ", boxShow)

  const fetchDetails = async () => {
    setIsLoading(true)
    try {
      const jwt = localStorage.getItem("jwtToken")
      const { data: res } = await axios.get(`${API_URL}/pokemons/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      const data = res.data.attributes
      setPokemon(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updatePokemon = async (formData) => {
    try {
      if (!formData.name || !formData.type) {
        throw new Error("Name and type are required")
      }

      if (pokemon) {
        const jwt = localStorage.getItem("jwtToken")
        const res = await axios.put(
          `${API_URL}/pokemons/${id}`,
          {
            data: formData,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        console.log("PUT res", res)
      } else {
        console.log("no data to update")
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.log("Error")
      console.error(err)
    } finally {
      await fetchDetails()
    }
  }

  const deletePokemon = async () => {
    try {
      if (pokemon) {
        const jwt = localStorage.getItem("jwtToken")
        const res = await axios.delete(`${API_URL}/pokemons/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        console.log("DELETE res", res)
      } else {
        console.log("no data to delete")
      }
      // go back to list page
      navigate("/")
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.log("Error")
      console.error(err)
    } finally {
      await fetchDetails()
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
      <button
        className="mt-5 underline text-slate-600 hover:text-slate-500"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <div className="block max-w-[320px] bg-slate-300 shadow-md rounded-xl py-4 px-5 mx-auto my-7">
        <img
          src={pokemon?.imageUrl}
          alt={pokemon?.name}
          className="object-contain w-full"
        />
        <p className="font-bold text-center">{pokemon?.name}</p>
      </div>
      <span className="px-4 py-3 text-white rounded-full bg-slate-400">
        {pokemon?.type}
      </span>
      {!!errorMessage && <p className="my-5 text-red-400">{errorMessage}</p>}
      {boxShow && (
        <ConfirmDeletePopup
          showBox={boxShow}
          onClose={toggleBoxShow}
          onDelete={deletePokemon}
        />
      )}
      {pokemon && (
        <PokemonEditForm
          initialValues={pokemon}
          handleSubmit={updatePokemon}
          handleDelete={toggleBoxShow}
        />
      )}
    </div>
  )
}

export default DetailPage
