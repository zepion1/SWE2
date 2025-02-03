import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import RoomChangeRequest from "./pages/RoomChangeRequest"; // Assume you will create this component
import ITSupport from "./pages/ITSupport"; // Assume you will create this component

function App() {
  return (
    <Router>  
      <Sidebar className="sidebar" />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/room-changes" element={<RoomChangeRequest />} />
        <Route path="/it-support" element={<ITSupport />} />
      </Routes>
    </Router>
  );
}

export default App;