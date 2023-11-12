import { useState } from "react"
import { POKEMON_TYPES } from "../../../constants"

const SANITIZED_POKEMON_TYPES = POKEMON_TYPES.filter((type) => type !== "ANY") // m lo tr twy phel

const PokemonEditForm = ({ handleSubmit }) => {
  const initialValues = {
    name: "",
    type: "",
    imageUrl: "",
  }

  console.log("initialValues in edit form", initialValues)
  const [formData, setFormData] = useState(initialValues)

  const submitForm = (e) => {
    e.preventDefault()

    console.log("formData", formData)
    handleSubmit(formData)
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
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, name: event.target.value }))
          }
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
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, imageUrl: event.target.value }))
          }
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
