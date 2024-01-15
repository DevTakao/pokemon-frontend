import { getJwt } from "../utility/jwt"
import axios from "axios"

// method => get / post / put / delete
// url => localhost:1337/api/pokemons

const validMethods = ["get", "post", "put", "delete"]
const isValidMethod = (str) => validMethods.includes(str)

const useAPI = ({ method = "get", url = "#" }) => {
  const isValid = isValidMethod(method)

  const action = async (data) => {
    const jwt = getJwt()
    let response
    if (method === "put" || method === "post") {
      response = await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    } else {
      response = await axios[method](url, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    }

    return response
  }

  if (!isValid) {
    const err = new Error("Invalid method passed to useAPI hook")
    return { action: action, error: err }
  }

  return { action: action, error: undefined }
}

export default useAPI
