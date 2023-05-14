const asyncHandler = require("express-async-handler");

const getAllGainsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Gains" });
});

const getGainHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Gain" });
});

const createGainHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Gain" });
});

module.exports = { getAllGainsHandler, getGainHandler, createGainHandler };
