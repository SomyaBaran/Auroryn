import { Route, Routes } from "react-router-dom";
import './App.css'
import { Landing } from "./pages/Landing";
import Auth from "./pages/Auth";
import NewStory from "./pages/NewStory";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { BlogPage } from "./pages/BlogPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/new-story" element={<NewStory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
  )
}

export default App