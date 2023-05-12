const {
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  createArticle,
} = require("../controllers/article");

const router = require("express").Router();

// @desc Get all articles
// @route GET /api/{version}/articles
// public
router.get("/", getArticles);

// @desc Create an article
// @route POST /api/{version}/articles
// public
router.post("/", createArticle);

// @desc Get single article
// @route GET /api/{version}/articles/:id
// public
router.get("/:id", getArticle);

// @desc Update single article
// @route PUT /api/{version}/articles/:id
// public
router.put("/:id", updateArticle);

// @desc Delete single article
// @route DELETE /api/{version}/articles/:id
// public
router.delete("/:id", deleteArticle);

module.exports = router;
