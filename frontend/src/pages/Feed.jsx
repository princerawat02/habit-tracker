import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axiosClient
      .get("/feed", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeed(res.data));
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Friends Activity Feed</h2>
      <div className="grid gap-4">
        {Array.isArray(feed) && feed.length > 0 ? (
          feed.map((item) => (
            <div className="card bg-base-100 shadow-lg p-2" key={item._id}>
              <div className="card-body">
                <span className="font-semibold capitalize text-lg">
                  {item.user?.username || "Unknown User"}
                </span>{" "}
                checked in for{" "}
                <span className="font-semibold text-blue-500">
                  {item.habit?.name || "Unknown Habit"}
                </span>{" "}
                <div className="flex gap-2 items-center">
                  <span>On</span>
                  <span className="text-sm text-gray-500">
                    {item.date
                      ? new Date(item.date).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "Unknown Date"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No activity found.</div>
        )}
      </div>
    </div>
  );
}
