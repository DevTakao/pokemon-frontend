import { useEffect, useState } from "react"
import { POKEMON_TYPES } from "../../../constants"

const SANITIZED_POKEMON_TYPES = POKEMON_TYPES.filter((type) => type !== "ANY") // m lo tr twy phel

const PokemonEditForm = ({ initialValues, handleSubmit, handleDelete }) => {
  // console.log("initialValues in edit form", initialValues)
  const [formData, setFormData] = useState()

  const submitForm = (e) => {
    e.preventDefault()

    console.log("formData", formData)
    handleSubmit(formData)
  }

  const resetForm = () => {
    console.log("reset")
    setFormData(initialValues)
  }

  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues])

  return !formData ? (
    <></>
  ) : (
    <form onSubmit={submitForm} onReset={resetForm} className="my-4">
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
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, name: event.target.value }))
          }
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
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, type: event.target.value }))
          }
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
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))
          }
          className="px-3 py-2 mx-3 my-4 text-black bg-blue-200 border border-blue-300 rounded-lg placeholder:text-white"
        />
      </div>

      <div className="flex items-center justify-center mt-10">
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
