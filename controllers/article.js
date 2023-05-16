const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllArticlesHandler = asyncHandler(async (req, res) => {
  await db.query(
    {
      sql: "SELECT * FROM article art, categorie cat WHERE art.id_cat = cat.id_cat ORDER BY nom_art ASC",
    },
    (errors, result) => {
      if (errors) throw errors;
      res.status(200).json(result);
    }
  );
});

// Create an article
const createArticleHandler = asyncHandler(async (req, res, next) => {
  // const image_art = req.file;
  console.log(req.res);
  // res.status(201).json(image_art);
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
