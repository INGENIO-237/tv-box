const asyncHandler = require("express-async-handler");

const getAllPromotions = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Promotions" });
});

const createPromotion = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Promotion" });
});

const getPromotion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Single Promotion" });
});

const updatePromotion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update Promotion" });
});

const deletePromotion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Promotion" });
});

module.exports = {
  getAllPromotions,
  createPromotion,
  getPromotion,
  updatePromotion,
  deletePromotion,
};
