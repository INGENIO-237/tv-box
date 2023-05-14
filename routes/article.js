const {
  getAllArticlesHandler,
  createArticleHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
} = require("../controllers/article");

const router = require("express").Router();

// @desc Get all articles
// @route GET /api/{version}/articles
// public
router.get("/", getAllArticlesHandler);

// @desc Create an article
// @route POST /api/{version}/articles
// public
router.post("/", createArticleHandler);

// @desc Get single article
// @route GET /api/{version}/articles/:id
// public
router.get("/:id", getArticleHandler);

// @desc Update single article
// @route PUT /api/{version}/articles/:id
// public
router.put("/:id", updateArticleHandler);

// @desc Delete single article
// @route DELETE /api/{version}/articles/:id
// public
router.delete("/:id", deleteArticleHandler);

module.exports = router;
