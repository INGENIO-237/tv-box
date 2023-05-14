const asyncHandler = require("express-async-handler");

const getAllUsersHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all users" });
});

const getUserHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single user" });
});

const getUsersByRoleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get users by role" });
});

const updateUserHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: `Update user with id : ${req.params.id}` });
});

const deleteUserHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user with id : ${req.params.id}` });
});

const getUserGainsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all gains of a single user" });
});

module.exports = {
  getAllUsersHandler,
  getUserHandler,
  getUsersByRoleHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserGainsHandler,
};
