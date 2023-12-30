import axios from "axios"
import PokemonCreateForm from "./PokemonCreateForm"
import { useNavigate } from "react-router"
import { getJwt } from "../../utility/jwt"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const CreatePage = () => {
  const navigate = useNavigate()

  const createPokemon = async (formData) => {
    try {
      if (!formData.name || !formData.type) {
        throw new Error("Name and type are required")
      }

      const jwt = getJwt()
      const res = await axios.post(
        `${API_URL}/pokemons`,
        { data: formData },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      if (res.status === 200) {
        alert("Success")
      }
    } catch (err) {
      console.log("Error")
      console.error(err)
    }
  }

  return (
    <div className="text-center">
      <button
        className="mt-5 underline text-slate-600 hover:text-slate-500"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
      <h1 className="my-5 text-2xl font-bold">Create a new pokemon</h1>
      <PokemonCreateForm handleSubmit={(formData) => createPokemon(formData)} />
    </div>
  )
}

export default CreatePage
