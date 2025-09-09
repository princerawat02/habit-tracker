import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if not authenticated
      return;
    }

    fetchHabits();
  }, [token, navigate]);

  const fetchHabits = async () => {
    try {
      const res = await axiosClient.get("/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load habits.");
    }
  };

  const handleCheckIn = async (id) => {
    try {
      await axiosClient.post(
        `/habits/${id}/checkin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Check-in successful!");
      fetchHabits(); // Refresh habit list
    } catch (err) {
      console.error(err);
      toast.error("Check-in failed or already done for today.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits((prev) => prev.filter((habit) => habit._id !== id));
      toast.success("Habit deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete habit.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Habits</h1>
        <Link to="/habits/create" className="btn btn-primary">
          + Add Habit
        </Link>
      </div>

      {/* Toast notifications will show errors and success, no inline error UI needed */}

      <div className="grid gap-4">
        {habits.length ? (
          habits.map((habit) => (
            <div key={habit._id} className="card bg-base-100 shadow-xl">
              <div className="card-body flex flex-row justify-between items-center">
                <div>
                  <h2 className="card-title">{habit.name}</h2>
                  <p className="text-sm text-gray-500">
                    {habit.category} • {habit.frequency}
                  </p>
                  <span className="badge badge-success mt-2">
                    Streak: {habit.streak || 0}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={() => handleCheckIn(habit._id)}
                  >
                    Check In
                  </button>

                  <Link
                    to={`/habits/${habit._id}/edit`}
                    className="btn btn-secondary"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(habit._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No habits found. Create your first habit!</p>
        )}
      </div>
    </div>
  );
}
