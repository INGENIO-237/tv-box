const {
  getAllArticlesHandler,
  createArticleHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
} = require("../controllers/article");

const storage = require("../utils/image-storage");

const accessVerification = require("../middlewares/tokenVerification");
const checkId = require("../middlewares/check-id");

// Package in charge of handling images
const multer = require("multer");
const upload = multer({ storage: storage });

const router = require("express").Router();

// @desc Get all articles
// @route GET /api/{version}/articles
// private
router.get("/", getAllArticlesHandler);

// @desc Create an article
// @route POST /api/{version}/articles
// private
router.post("/", accessVerification, createArticleHandler);

// @desc Get single article
// @route GET /api/{version}/articles/:id
// private
router.get("/:id", checkId, getArticleHandler);

// @desc Update single article
// @route PUT /api/{version}/articles/:id
// private
router.put("/:id", accessVerification, checkId, upload.single('image_art'), updateArticleHandler);

// @desc Delete single article
// @route DELETE /api/{version}/articles/:id
// private
router.delete("/:id", accessVerification, checkId, deleteArticleHandler);

module.exports = router;
