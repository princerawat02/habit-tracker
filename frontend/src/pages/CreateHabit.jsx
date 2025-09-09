import { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateHabit() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(
        "/habits",
        { name, category, frequency },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Habit created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create habit.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 card bg-base-100 shadow-xl mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Create Habit</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="input input-bordered w-full mb-2"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="input input-bordered w-full mb-2"
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="input input-bordered w-full mb-4"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button type="submit" className="btn btn-primary w-full">
        Create
      </button>
    </form>
  );
}
