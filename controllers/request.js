const asyncHandler = require("express-async-handler");

const getAllRequestsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Requests" });
});

const getRequestHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Request" });
});

const createRequestHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Request" });
});

const updateRequestHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Request" });
});

const deleteRequestHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Request" });
});

module.exports = {
  getAllRequestsHandler,
  getRequestHandler,
  createRequestHandler,
  updateRequestHandler,
  deleteRequestHandler,
};
