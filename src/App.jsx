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

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<PrivateWrapper />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
            <Route path="/pokemon/create" element={<CreatePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
