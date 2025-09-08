import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  const { q } = req.query;
  const users = await User.find({
    username: { $regex: q || "", $options: "i" },
  }).select("_id username email");
  res.json(users);
};

export const followUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const userToFollow = await User.findById(req.params.id);
  if (!userToFollow) return res.status(404).json({ message: "User not found" });
  // Prevent following self
  if (req.user._id.equals(userToFollow._id)) {
    return res.status(400).json({ message: "Cannot follow yourself" });
  }
  if (req.user.friends.includes(userToFollow._id)) {
    return res.status(400).json({ message: "Already following" });
  }
  req.user.friends.push(userToFollow._id);
  await req.user.save();
  res.json({ message: "Followed user" });
};
