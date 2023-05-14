const asyncHandler = require("express-async-handler");

const getAllPromotionsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Promotions" });
});

const createPromotionHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Promotion" });
});

const getPromotionHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Single Promotion" });
});

const updatePromotionHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update Promotion" });
});

const deletePromotionHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Promotion" });
});

module.exports = {
  getAllPromotionsHandler,
  createPromotionHandler,
  getPromotionHandler,
  updatePromotionHandler,
  deletePromotionHandler,
};
