const asyncHandler = require("express-async-handler");

const getAllPayments = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Payments" });
});

const getPayment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Payment" });
});

const createPayment = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Payment" });
});

const updatePayment = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Payment" });
});

const deletePayment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Payment" });
});

module.exports = {
  getAllPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
