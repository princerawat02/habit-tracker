import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    axiosClient.get("/leaderboard").then((res) => {
      setLeaders(res.data);
    });
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="card bg-base-100 shadow-xl p-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((user, idx) => (
              <tr key={user.username}>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.totalStreak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
