import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import "./App.css"
import HomePage from "./components/Home/HomePage"
import DetailPage from "./components/Detail/DetailPage"
import CreatePage from "./components/Create/CreatePage"
import NotFoundPage from "./components/NotFoundPage"
import LoginPage from "./components/LoginPage"
import PrivateWrapper from "./components/PrivateWrapper"
import Navbar from "./common/Navbar"
import AboutUsPage from "./components/AboutUs/AboutUsPage"
import ProfilePage from "./components/MyProfile/ProfilePage"
import ShopPage from "./components/Shop/ShopPage"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />

          <Route path="/" element={<PrivateWrapper />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
            <Route path="/pokemon/create" element={<CreatePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
