const asyncHandler = require("express-async-handler");

// User
const registerUserHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Register User" });
});

const loginUserHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Login User" });
});

const currentUserHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get current User info" });
});

module.exports = { registerUserHandler, loginUserHandler, currentUserHandler };
