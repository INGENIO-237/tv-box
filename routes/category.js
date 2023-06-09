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

// acess token verification middleware
router.use(accessVerification);

// @desc Get All Categories
// @route GET /api/{version}/categories
// private
router.get("/", getAllCategoriesHandler);

// @desc Create a Category
// @route POST /api/{version}/categories
// private
router.post("/", createCategoryHandler);

// @desc Get a single Category
// @route GET /api/{version}/categories
// private
router.get("/:id", checkId, getCategoryHandler);

// @desc Update a Category
// @route PUT /api/{version}/categories/:id
// private
router.put("/:id", checkId, updateCategoryHandler);

// @desc Delete a Category
// @route DELETE /api/{version}/categories/:id
// private
router.delete("/:id", checkId, deleteCategoryHandler);

// @desc Get all articles of a certain Category
// @route GET /api/{version}/categories/:id/articles
// private
router.get("/:id/articles", getCategoryArticlesHandler);

module.exports = router;
