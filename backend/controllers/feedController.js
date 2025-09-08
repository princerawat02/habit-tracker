import CheckIn from "../models/CheckIn.js";

export const getFeed = async (req, res) => {
  const friends = req.user.friends;
  const feed = await CheckIn.find({ user: { $in: friends } })
    .sort({ date: -1 })
    .limit(20)
    .populate("user", "username")
    .populate("habit", "name");
  // Only return check-ins for habits that still exist
  const filteredFeed = feed.filter((item) => item.habit !== null);
  res.json(filteredFeed);
};
