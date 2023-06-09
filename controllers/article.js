const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const { deleteImg } = require("../utils/article-image");

const getAllArticlesHandler = asyncHandler(async (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM article art, categorie cat WHERE art.id_cat = cat.id_cat ORDER BY nom_art ASC",
    },
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(200).json(result);
    }
  );
});

// Create an article
const createArticleHandler = asyncHandler(async (req, res, next) => {
  const { id_cat, nom_art, desc_art, prix_art, image_art } = req.body;

  db.query(
    {
      sql: "INSERT INTO article(id_cat, nom_art, desc_art, prix_art, image_art) VALUES(?,?,?,?,?)",
    },
    [id_cat, nom_art, desc_art, prix_art, image_art],
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(201).json({
        insertedId: result.insertId,
        message: "Article inserted successfully",
      });
    }
  );
});

const getArticleHandler = asyncHandler(async (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM article art, categorie cat WHERE cat.id_cat = art.id_cat AND art.id_art = ?",
    },
    [req.params.id],
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      if (result.length == 0) {
        res.status(404).json({
          message: `Article with id ${req.params.id} does not exist`,
        });
      } else {
        res.status(200).json(result[0]);
      }
    }
  );
});

const updateArticleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const { id_cat, nom_art, desc_art, prix_art, image_art } = req.body;

    db.query(
      {
        sql: "UPDATE article SET id_cat = ?, nom_art = ?, desc_art = ?, prix_art = ?, image_art = ? WHERE id_art = ?",
      },
      [id_cat, nom_art, desc_art, prix_art, image_art, req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        res.status(200).json({ message: "Article updated successfully" });
      }
    );
  }
});

const deleteArticleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    db.query(
      { sql: "DELETE FROM article WHERE id_art = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        res.status(200).json({ message: "Article deleted successfully" });
      }
    );
  }
});

module.exports = {
  getAllArticlesHandler,
  createArticleHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
};
