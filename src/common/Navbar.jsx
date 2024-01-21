import { useAppStore } from "../store/useAppStore"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { isLoggedIn, _clearStore } = useAppStore()

  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    _clearStore()
  }

  return (
    <nav className="p-4 bg-blue-500">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl text-white">Pokemons</h1>
        <ul className="flex items-center justify-between max-w-[700px] mx-auto">
          <li className="px-6 py-3 text-white transition duration-700 hover:scale-125">
            <Link to="/">Home</Link>
          </li>
          <li className="px-6 py-3 text-white transition duration-700 hover:scale-125">
            <Link to="aboutus">About</Link>
          </li>
          {isLoggedIn && (
            <li className="px-6 py-3 text-white transition duration-700 hover:scale-125">
              <Link to="shop">Shop</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="px-6 py-3 text-white transition duration-700 hover:scale-125">
              <Link to="profile">My Profile</Link>
            </li>
          )}
        </ul>
        {isLoggedIn && (
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-black bg-white rounded hover:bg-blue-100"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
