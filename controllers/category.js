const asyncHandler = require("express-async-handler");

const getAllCategoriesHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All categories" });
});

const createCategoryHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create a category" });
});

const getCategoryHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get a category with id: ${req.params.id}` });
});

const updateCategoryHandler = asyncHandler(async (req, res) => {
  res
    .status(204)
    .json({ message: `Update a category with id: ${req.params.id}` });
});

const deleteCategoryHandler = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Delete a category with id: ${req.params.id}` });
});

const getCategoryArticlesHandler = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Get all articles of category ${req.params.id}` });
});

module.exports = {
  getAllCategoriesHandler,
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoryArticlesHandler,
};
