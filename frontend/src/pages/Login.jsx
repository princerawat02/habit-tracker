import { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new submit
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-6"
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
          Login
        </button>
      </form>
    </div>
  );
}
