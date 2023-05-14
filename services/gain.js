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

module.exports = { getAllGains, getGain, createGain };
