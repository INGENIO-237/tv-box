const asyncHandler = require("express-async-handler");

const getAllOrders = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Get all Orders" });
});

const getOrder = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Get single Order" });
});

const createOrder = asyncHandler(async (req, res) =>{
    res.status(201).json({ message: "Create an Order" });
});

const updateOrder = asyncHandler(async (req, res) =>{
    res.status(204).json({ message: "Update Order" });
});

const deleteOrder = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Delete Order" });
});

module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder };