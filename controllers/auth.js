const asyncHandler = require("express-async-handler");

// User
const registerUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Register User" });
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Login User" });
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get current User info" });
});

module.exports = { registerUser, loginUser, currentUser };
