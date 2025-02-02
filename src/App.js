import Sidebar from "./components/Sidebar";
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

function App() {
  return (
    <Router>  
      <Sidebar className="sidebar" />
      <Routes>
        <Route
          path="/home"
          element={<Home  />}
        />
        <Route
          path="/income"
          element={<Home/>}
        />
        <Route
          path="/expenses"
          element={<Home  />}
        />
        <Route
          path="/goals"
          element={<Home  />}
        />
        <Route
          path="/reminders"
          element={<Home  />}
        />
      </Routes>
    </Router>
  );
}

export default App;
