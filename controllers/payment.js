const asyncHandler = require("express-async-handler");

const getAllPaymentsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Payments" });
});

const getPaymentHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Payment" });
});

const createPaymentHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Payment" });
});

const updatePaymentHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Payment" });
});

const deletePaymentHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Payment" });
});

module.exports = {
  getAllPaymentsHandler,
  getPaymentHandler,
  createPaymentHandler,
  updatePaymentHandler,
  deletePaymentHandler,
};
