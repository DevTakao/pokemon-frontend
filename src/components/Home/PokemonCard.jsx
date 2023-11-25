import { useState } from "react"
import { MdEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import { Tooltip } from "react-tooltip"
import ConfirmDeletePopup from "../Detail/ConfirmDeletePopup"
import axios from "axios"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const PokemonCard = ({ pokemon, handleClick, fetchData }) => {
  const [boxShow, setBoxShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const toggleBoxShow = () => setBoxShow(!boxShow)
  const deletePokemon = async () => {
    try {
      if (pokemon) {
        const jwt = localStorage.getItem("jwtToken")
        await axios.delete(`${API_URL}/pokemons/${pokemon.id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
      } else {
        throw new Error("The data to delete does not exist")
      }
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.error(err)
    } finally {
      fetchData()
    }
  }

  return (
    <div
      key={pokemon.id}
      className="flex items-center px-5 py-4 mx-10 my-3 border-2 border-transparent shadow-lg cursor-pointer bg-slate-300 rounded-xl hover:border-blue-400"
    >
      <img
        src={pokemon?.attributes?.imageUrl}
        alt={pokemon?.attributes?.name}
        className="object-contain w-[75px] ml-10 mr-20"
      />
      <span className="text-xl font-medium">{pokemon?.attributes?.name}</span>

      <div className="ml-auto ">
        <Tooltip id="edit-tooltip" />
        <button
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Edit"
          type="button"
          onClick={handleClick}
          className="px-5 py-2 text-xl rounded-full text-red"
        >
          <MdEdit />
        </button>

        {!!errorMessage && <p className="my-5 text-red-400">{errorMessage}</p>}

        {boxShow && (
          <ConfirmDeletePopup
            showBox={boxShow}
            onClose={toggleBoxShow}
            onDelete={deletePokemon}
          />
        )}
        <Tooltip id="delete-tooltip" />
        <button
          type="button"
          data-tooltip-id="delete-tooltip"
          data-tooltip-content="Delete"
          onClick={toggleBoxShow}
          className="px-5 py-2 ml-2 text-xl bg-red-400 rounded-full text-red"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  )
}

export default PokemonCard
