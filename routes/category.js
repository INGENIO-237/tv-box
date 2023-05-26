const {
  getAllCategoriesHandler,
  createCategoryHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoryArticlesHandler,
} = require("../controllers/category");

const accessVerification = require("../middlewares/tokenVerification");
const checkId = require("../middlewares/check-id");

const router = require("express").Router();

// @desc Get All Categories
// @route GET /api/{version}/categories
// public
router.get("/", getAllCategoriesHandler);

// @desc Create a Category
// @route POST /api/{version}/categories
// private
router.post("/", accessVerification, createCategoryHandler);

// @desc Get a single Category
// @route GET /api/{version}/categories
// public
router.get("/:id", checkId, getCategoryHandler);

// @desc Update a Category
// @route PUT /api/{version}/categories/:id
// private
router.put("/:id", accessVerification, checkId, updateCategoryHandler);

// @desc Delete a Category
// @route DELETE /api/{version}/categories/:id
// private
router.delete("/:id", accessVerification, checkId, deleteCategoryHandler);

// @desc Get all articles of a certain Category
// @route GET /api/{version}/categories/:id/articles
// public
router.get("/:id/articles", getCategoryArticlesHandler);

module.exports = router;
