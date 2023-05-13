const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoryArticles,
} = require("../controllers/category");

const router = require("express").Router();

// @desc Get All Categories
// @route GET /api/{version}/categories
// public
router.get("/", getCategories);

// @desc Create a `Categorie`
// @route POST /api/{version}/categories
// public
router.post("/", createCategory);

// @desc Get a single `Categorie`
// @route GET /api/{version}/categories
// public
router.get("/:id", getCategory);

// @desc Update a `Categorie`
// @route PUT /api/{version}/categories/:id
// public
router.put("/:id", updateCategory);

// @desc Delete a `Categorie`
// @route DELETE /api/{version}/categories/:id
// public
router.delete("/:id", deleteCategory);

// @desc Get all articles of a certain `Categorie`
// @route GET /api/{version}/categories/:id/articles
// public
router.get("/:id/articles", getCategoryArticles);

module.exports = router;
