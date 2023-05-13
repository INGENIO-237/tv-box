const asyncHandler = require("express-async-handler");

const getAllRequests = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Requests" });
});

const getRequest = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Request" });
});

const createRequest = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Request" });
});

const updateRequest = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Request" });
});

const deleteRequest = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Request" });
});

module.exports = {
  getAllRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
};
