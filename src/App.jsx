import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Homepage from "./components/pages/Homepage"
import FavoritesPage from "./components/pages/FavoritesPage"

function App() {
  

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      
      
    </div>
  )
}

export default App
