import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import RoomChangeRequest from "./pages/RoomChangeRequest"; 
import ITSupport from "./pages/ITSupport.js"; 
import Login from "../src/pages/Login.js";
import AttendanceClasses from "./pages/AttendanceClasses.js";
import AssignedRooms from "../src/pages/AssignedRooms.js";
import CalendarPage from "../src/pages/Calendar.js";
import Attendance from "../src/pages/Attendance.js";

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide sidebar on the login page
  const hideSidebar = location.pathname === "/";

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar className="sidebar" />}
      <div className="main-content">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room-changes" element={<RoomChangeRequest />} />
          <Route path="/it-support" element={<ITSupport />} />
          <Route path="/home" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance/:className" element={<AttendanceClasses />} />
          <Route path="/assigned-rooms" element={<AssignedRooms />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
