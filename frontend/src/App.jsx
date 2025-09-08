import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateHabit from "./pages/CreateHabit";
import EditHabit from "./pages/EditHabit";
import Feed from "./pages/Feed";
import SearchUsers from "./pages/SearchUsers";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/habits/create"
          element={token ? <CreateHabit /> : <Navigate to="/login" />}
        />
        <Route
          path="/habits/:id/edit"
          element={token ? <EditHabit /> : <Navigate to="/login" />}
        />
        <Route
          path="/feed"
          element={token ? <Feed /> : <Navigate to="/login" />}
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/search"
          element={token ? <SearchUsers /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
