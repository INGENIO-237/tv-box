const storage = require("../config/image-storage");
const {
  getAllArticlesHandler,
  createArticleHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
} = require("../controllers/article");

// Package in charge of handling images
const multer = require("multer");
const upload = multer({ storage: storage });

const router = require("express").Router();

// @desc Get all articles
// @route GET /api/{version}/articles
// public
router.get("/", getAllArticlesHandler);

// @desc Create an article
// @route POST /api/{version}/articles
// public
router.post("/", upload.single('image_art'), createArticleHandler);

// @desc Get single article
// @route GET /api/{version}/articles/:id
// public
router.get("/:id", getArticleHandler);

// @desc Update single article
// @route PUT /api/{version}/articles/:id
// public
router.put("/:id", upload.single('image_art'), updateArticleHandler);

// @desc Delete single article
// @route DELETE /api/{version}/articles/:id
// public
router.delete("/:id", deleteArticleHandler);

module.exports = router;
