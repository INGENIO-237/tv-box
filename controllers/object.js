const asyncHandler = require("express-async-handler");

const getAllObjectsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all objects" });
});

const getObjectHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single object" });
});

const createObjectHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an object" });
});

const updateObjectHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update object" });
});

const deleteObjectHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete object" });
});

const getObjetRequestsHandler = asyncHandler(async (req, res) =>{
  res.status(200).json({ message: "Get all requests of an object" });
});

module.exports = {
  getAllObjectsHandler,
  getObjectHandler,
  createObjectHandler,
  updateObjectHandler,
  deleteObjectHandler,
  getObjetRequestsHandler
};
