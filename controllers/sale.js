const asyncHandler = require("express-async-handler");

const getAllSalesHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Sales" });
});

const getSaleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Sale" });
});

const createSaleHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Sale" });
});

const updateSaleHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Sale" });
});

const deleteSaleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Sale" });
});

module.exports = {
  getAllSalesHandler,
  getSaleHandler,
  createSaleHandler,
  updateSaleHandler,
  deleteSaleHandler,
};
