const asyncHandler = require("express-async-handler");

const getAllGains = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Gains" });
});

const getGain = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Gain" });
});

const createGain = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Gain" });
});

const updateGain = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Gain" });
});

const deleteGain = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Gain" });
});

module.exports = { getAllGains, getGain, createGain, updateGain, deleteGain };
