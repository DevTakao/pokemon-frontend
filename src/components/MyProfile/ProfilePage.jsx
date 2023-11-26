import axios from "axios"
import { useEffect, useState } from "react"
import PasswordForm from "./PasswordForm"

const ENV = import.meta.env
const API_URL =
  ENV.MODE === "development" ? ENV.VITE_DEV_API_URL : ENV.VITE_PROD_API_URL

const ProfilePage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("jwtToken")
        const { data } = await axios.get(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })

        const { username, email } = await data
        setData({
          username,
          email,
        })
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log("data", data)
  }, [data])

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="px-6 py-4 my-5 text-2xl font-medium text-white rounded-full bg-amber-400">
        My Profile
      </h1>
      <div className=" max-w-[90%] mx-auto flex flex-col items-start justify-start">
        <p>
          <strong className="mr-3">Username:</strong>
          {data?.username}
        </p>
        <p>
          <strong className="mr-3">Email:</strong>
          {data?.email}
        </p>
      </div>
      <PasswordForm />
    </div>
  )
}

export default ProfilePage
