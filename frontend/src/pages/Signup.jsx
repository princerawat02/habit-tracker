import { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <div className="alert alert-error mb-2">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full mb-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading && (
            <span className="loading loading-spinner loading-sm mr-2"></span>
          )}
          Sign Up
        </button>
      </form>
    </div>
  );
}
