import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditHabit() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axiosClient
      .get(`/habits`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const habit = res.data.find((h) => h._id === id);
        if (habit) {
          setName(habit.name);
          setCategory(habit.category);
          setFrequency(habit.frequency);
        }
      });
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(
        `/habits/${id}`,
        { name, category, frequency },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Habit updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update habit.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 card bg-base-100 shadow-xl mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Edit Habit</h2>
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
        Save
      </button>
    </form>
  );
}
