import { useEffect, useState } from "react"
import { POKEMON_TYPES } from "../../../constants"
import { useParams } from "react-router"
import useAPI from "../../hooks/useAPI"

const SANITIZED_POKEMON_TYPES = POKEMON_TYPES.filter((type) => type !== "ANY") // m lo tr twy phel

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const PokemonEditForm = ({
  initialValues,
  handleDelete,
  fetchDetails,
  setErrorMessage,
}) => {
  const [formData, setFormData] = useState()
  const { id } = useParams()

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const { action: updateAction, error } = useAPI({
    method: "put",
    url: `${API_URL}/pokemons/${id}`,
    data: { data: formData },
  })

  const updatePokemon = async (formData) => {
    try {
      if (error) {
        throw error
      }
      if (!formData.name || !formData.type) {
        throw new Error("Name and type are required")
      }

      if (initialValues) {
        const res = await updateAction()
        console.log("PUT res", res)
      } else {
        console.log("no data to update")
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.error(err)
    } finally {
      await fetchDetails()
    }
  }

  const submitForm = (e) => {
    e.preventDefault()
    updatePokemon(formData)
  }

  const resetForm = () => {
    setFormData(initialValues)
  }

  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues])

  return !formData ? (
    <></>
  ) : (
    <form
      onSubmit={submitForm}
      onReset={resetForm}
      className="mt-4 mb-20 grid grid-cols-1 max-w-lg mx-auto text-left"
    >
      <div className="w-[90%] mx-auto">
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
            className="px-3 py-2 mx-3 my-4 text-black bg-blue-200 border border-blue-300 rounded-lg placeholder:text-white"
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
            onChange={(e) => handleChange("type", e.target.value)}
            className="px-4 py-2 mx-3 bg-blue-300 rounded-full"
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
            placeholder="Electric"
            name="pokemonImageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            className="px-3 py-2 mx-3 my-4 text-black bg-blue-200 border border-blue-300 rounded-lg placeholder:text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 w-[90%] mx-auto">
        <button
          type="submit"
          className="px-5 py-2 mr-5 text-white bg-blue-400 rounded-full"
        >
          Save Changes
        </button>
        <button
          type="reset"
          className="px-5 py-2 mr-5 text-white rounded-full bg-slate-400"
        >
          Reset
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="px-5 py-2 bg-red-400 rounded-full text-red"
        >
          Delete
        </button>
      </div>
    </form>
  )
}

export default PokemonEditForm
