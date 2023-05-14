const asyncHandler = require("express-async-handler");

const getAllArticlesHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Articles" });
});

const createArticleHandler = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Create an article" });
});

const getArticleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Single article" });
});

const updateArticleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update article" });
});

const deleteArticleHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete article" });
});

module.exports = {
  getAllArticlesHandler,
  createArticleHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
};
