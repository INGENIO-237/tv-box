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

// @desc Create a Category
// @route POST /api/{version}/categories
// public
router.post("/", createCategory);

// @desc Get a single Category
// @route GET /api/{version}/categories
// public
router.get("/:id", getCategory);

// @desc Update a Category
// @route PUT /api/{version}/categories/:id
// public
router.put("/:id", updateCategory);

// @desc Delete a Category
// @route DELETE /api/{version}/categories/:id
// public
router.delete("/:id", deleteCategory);

// @desc Get all articles of a certain Category
// @route GET /api/{version}/categories/:id/articles
// public
router.get("/:id/articles", getCategoryArticles);

module.exports = router;
