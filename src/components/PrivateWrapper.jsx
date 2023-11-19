import { Navigate, Outlet } from "react-router"
import { useAppStore } from "../store/useAppStore"

const PrivateWrapper = () => {
  const { isLoggedIn } = useAppStore()

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateWrapper
