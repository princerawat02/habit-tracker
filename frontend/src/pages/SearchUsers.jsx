import React, { useState } from "react";
import axiosClient from "../axiosClient";
import { toast } from "react-toastify";

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axiosClient.get(`/users/search?q=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setResults(res.data);
  };

  const handleFollow = async (id) => {
    try {
      await axiosClient.post(
        `/users/${id}/follow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Followed user!");
    } catch (err) {
      console.error(err);
      const backendMsg = err.response?.data?.message;
      if (err.response && err.response.status === 400 && backendMsg) {
        toast.info(backendMsg);
      } else {
        toast.error(backendMsg || "Failed to follow user.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Search Users</h2>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Username"
          className="input input-bordered w-64"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <div className="grid gap-4">
        {results.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow flex-row flex justify-between items-center p-4"
          >
            <span>
              {user.username} ({user.email})
            </span>
            <button
              className="btn btn-success"
              onClick={() => handleFollow(user._id)}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
