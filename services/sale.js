const asyncHandler = require("express-async-handler");

const getAllSales = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Sales" });
});

const getSale = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Sale" });
});

const createSale = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Sale" });
});

const updateSale = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Sale" });
});

const deleteSale = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Sale" });
});

module.exports = { getAllSales, getSale, createSale, updateSale, deleteSale };
