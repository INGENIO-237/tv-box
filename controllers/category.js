const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All categories" });
});

const createCategory = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create a category" });
});

const getCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get a category with id: ${req.params.id}` });
});

const updateCategory = asyncHandler(async (req, res) => {
  res
    .status(204)
    .json({ message: `Update a category with id: ${req.params.id}` });
});

const deleteCategory = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a category with id: ${req.params.id}` });
});

const getCategoryArticles = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Get all articles of category ${req.params.id}` });
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryArticles,
};
