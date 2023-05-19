const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const { newPath, deleteImg } = require("../utils/article-image");
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

  const imgPath = newPath(req.file);

  await db.query(
    {
      sql: "INSERT INTO article(id_cat, nom_art, desc_art, prix_art, image_art) VALUES(?,?,?,?,?)",
    },
    [id_cat, nom_art, desc_art, prix_art, imgPath],
    (errors, result) => {
      if (errors) throw errors;
      res.status(201).json({
        insertedId: result.insertId,
        message: "Article inserted successfully",
      });
    }
  );
});

const getArticleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      {
        sql: "SELECT * FROM article art, categorie cat WHERE cat.id_cat = art.id_cat AND art.id_art = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: `Article with id ${req.params.id} does not exist`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const updateArticleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      {
        sql: "SELECT * FROM article art, categorie cat WHERE art.id_cat = cat.id_cat AND art.id_art = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: `Article with id ${req.params.id} does not exist`,
          });
        } else {
          // Deletes old article's image
          deleteImg(result);

          const { id_cat, nom_art, desc_art, prix_art } = req.body;

          const imgPath = newPath(req.file);

          db.query(
            {
              sql: "UPDATE article SET id_cat = ?, nom_art = ?, desc_art = ?, prix_art = ?, image_art = ? WHERE id_art = ?",
            },
            [id_cat, nom_art, desc_art, prix_art, imgPath, req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json({ message: "Article updated successfully" });
            }
          );
        }
      }
    );
  }
});

const deleteArticleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      {
        sql: "SELECT * FROM article art, categorie cat WHERE cat.id_cat = art.id_cat AND art.id_art = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: `Article with id ${req.params.id} does not exist`,
          });
        } else {
          // Deletes old article's image
          deleteImg(result);
          db.query(
            { sql: "DELETE FROM article WHERE id_art = ?" },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json({ message: "Article deleted successfully" });
            }
          );
        }
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
