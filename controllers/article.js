const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const fs = require("fs");

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
  const { id_cat, nom_art, desc_art, prix_art } = req.body;

  // Gets the extension of the file
  // sets the new name
  // and rename the file and its path
  const ext = req.file.mimetype.split("/")[1];
  const newName = req.file.filename + "." + ext;
  fs.rename(
    "./public/uploads/" + req.file.filename,
    "./public/uploads/" + newName,
    (err) => {
      if (err) throw err;
    }
  );
  const newPath = req.file.path + "." + ext;

  await db.query(
    {
      sql: "INSERT INTO article(id_cat, nom_art, desc_art, prix_art, image_art) VALUES(?,?,?,?,?)",
    },
    [id_cat, nom_art, desc_art, prix_art, newPath], (errors, result) =>{
      if(errors) throw errors;
      res.status(201).json({ insertedId: result.insertId, message: "Article inserted successfully" });
    }
  );
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
