import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import DetailPage from "./components/Detail/DetailPage";
import CreatePage from "./components/Create/CreatePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
          <Route path="/pokemon/create" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
