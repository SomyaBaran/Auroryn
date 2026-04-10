import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";
import Auth from "./pages/Auth";
import NewStory from "./pages/NewStory";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";

function App() {


  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/new-story" element={<NewStory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  )
}

export default App