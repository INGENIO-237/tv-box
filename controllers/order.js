const asyncHandler = require("express-async-handler");

const getAllOrdersHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all Orders" });
});

const getOrderHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get single Order" });
});

const createOrderHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an Order" });
});

const updateOrderHandler = asyncHandler(async (req, res) => {
  res.status(204).json({ message: "Update Order" });
});

const deleteOrderHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete Order" });
});

module.exports = {
  getAllOrdersHandler,
  getOrderHandler,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
};
