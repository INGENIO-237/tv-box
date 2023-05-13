const asyncHandler = require("express-async-handler");

const getAllObjects = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all objects" });
});

const getObject = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single object" });
});

const createObject = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an object" });
});

const updateObject = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update object" });
});

const deleteObject = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete object" });
});

module.exports = {
  getAllObjects,
  getObject,
  createObject,
  updateObject,
  deleteObject,
};
