import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";
import Auth from "./pages/Auth";

function App() {

  return (
    <Routes>
      <Route path="/auth" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App


