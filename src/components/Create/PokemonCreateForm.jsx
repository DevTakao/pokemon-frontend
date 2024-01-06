import { useState } from "react"
import axios from "axios"
import { getJwt } from "../../utility/jwt"
import { POKEMON_TYPES } from "../../../constants"

const SANITIZED_POKEMON_TYPES = POKEMON_TYPES.filter((type) => type !== "ANY") // m lo tr twy phel

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const PokemonEditForm = () => {
  const initialValues = {
    name: "",
    type: "",
    imageUrl: "",
  }
  const [formData, setFormData] = useState(initialValues)

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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const submitForm = (e) => {
    e.preventDefault()

    console.log("formData", formData)
    createPokemon(formData)
  }

  const resetForm = () => {
    console.log("reset")
    setFormData(initialValues)
  }

  return !formData ? (
    <></>
  ) : (
    <form
      onSubmit={submitForm}
      onReset={resetForm}
      className="inline-block my-4 text-left"
    >
      <div>
        <label
          htmlFor="pokemonName"
          className="w-[110px] inline-block font-bold"
        >
          Name:
        </label>
        <input
          type="text"
          placeholder="Pikachu"
          name="pokemonName"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="border border-pink-300 rounded-lg bg-pink-200 text-black px-3 py-2 my-4 mx-3 placeholder:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="pokemonType"
          className="w-[110px] inline-block font-bold"
        >
          Type:
        </label>
        <select
          value={formData.type}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, type: event.target.value }))
          }
          className="bg-pink-300 rounded-full px-4 py-2 mx-3"
        >
          {SANITIZED_POKEMON_TYPES.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="pokemonImageUrl"
          className="w-[110px] inline-block font-bold"
        >
          Image URL:
        </label>
        <input
          type="text"
          placeholder="www..."
          name="pokemonImageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          className="border border-pink-300 rounded-lg bg-pink-200 text-black px-3 py-2 my-4 mx-3 placeholder:text-white"
        />
      </div>

      <div className="mt-10 flex items-center justify-center">
        <button
          type="submit"
          className="bg-pink-400 text-white px-5 py-2 rounded-full mr-5"
        >
          Create
        </button>
        <button
          type="reset"
          className="bg-slate-400 text-white px-5 py-2 rounded-full mr-5"
        >
          Clear
        </button>
      </div>
    </form>
  )
}

export default PokemonEditForm
