import { useAppStore } from "../store/useAppStore"

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
