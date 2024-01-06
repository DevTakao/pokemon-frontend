import axios from "axios"
import { getJwt } from "../../utility/jwt"
import { useNavigate, useParams } from "react-router"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const ConfirmDeletePopup = ({
  showBox,
  onClose,
  setErrorMessage,
  pokemonId,
  fetchDetails,
}) => {
  console.log("pokemonId From Pokemoncard= ", pokemonId)
  const { id } = useParams()
  const navigate = useNavigate()

  const deletePokemon = async () => {
    try {
      if (!pokemonId && !id) {
        throw new Error("no data to delete")
      }

      console.log("Mingalarpar :)")
      const jwt = getJwt()
      const res = await axios.delete(`${API_URL}/pokemons/${pokemonId || id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      console.log("DELETE res", res)

      // go back to list page
      navigate("/")
    } catch (err) {
      setErrorMessage(JSON.stringify(err.message))
      console.error(err)
    } finally {
      if (pokemonId) {
        await fetchDetails()
      }
    }
  }

  return (
    showBox && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="box-border absolute items-center p-8 m-auto bg-white rounded shadow-md w-96">
          <h2 className="text-lg">
            Are you sure you want to delete this pokemon?
          </h2>
          <div className="flex justify-center mt-3">
            <button
              className="px-3 ml-2 text-lg border border-black rounded-full"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-3 ml-2 text-lg bg-red-400 border border-black rounded-full"
              onClick={deletePokemon}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ConfirmDeletePopup
