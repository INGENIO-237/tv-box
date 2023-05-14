const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all users" });
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single user" });
});

const getUsersByRole = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get users by role" });
});

const updateUser = asyncHandler(async (req, res) => {
  res.status(204).json({ message: `Update user with id : ${req.params.id}` });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user with id : ${req.params.id}` });
});

const getUserGains = asyncHandler(async (req, res) =>{
  res.status(200).json({ message: "Get all gains of a single user" });
});

module.exports = {
  getAllUsers,
  getUser,
  getUsersByRole,
  updateUser,
  deleteUser,
  getUserGains
};
