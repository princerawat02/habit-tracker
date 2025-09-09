import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="flex gap-4 p-4 bg-base-200 shadow items-center">
      {token && (
        <>
          <Link className="btn btn-ghost" to="/dashboard">
            Dashboard
          </Link>
          <Link className="btn btn-ghost" to="/feed">
            Friends Feed
          </Link>
          <Link className="btn btn-ghost" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="btn btn-ghost" to="/search">
            Search Users
          </Link>
          <div className="flex items-center ml-auto mr-4">
            <span className="mr-2 capitalize">{username}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </>
      )}
      {!token && (
        <>
          <Link className="btn btn-ghost" to="/login">
            Login
          </Link>
          <Link className="btn btn-ghost" to="/signup">
            Signup
          </Link>
        </>
      )}
    </nav>
  );
}
