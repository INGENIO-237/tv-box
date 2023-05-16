const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllCategoriesHandler = asyncHandler(async (req, res) => {
  await db.query(
    { sql: "SELECT * FROM categorie ORDER BY libelle_cat ASC" },
    (errors, result) => {
      if (errors) throw errors;
      res.status(200).json(result);
    }
  );
});

const createCategoryHandler = asyncHandler(async (req, res) => {
  const libelle = req.body.libelle_cat;
  if (!libelle) {
    res.status(400).json({
      message: `All fields are mandatory !`,
    });
  } else {
    await db.query(
      { sql: "INSERT INTO categorie(libelle_cat) values(?)" },
      [libelle],
      (errors, result) => {
        if (errors) throw errors;
        res.status(200).json({
          insertedId: result.insertId,
          message: "Category inserted successfully",
        });
      }
    );
  }
});

const getCategoryHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM categorie WHERE id_cat = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: `Category with id ${req.params.id} does not exist`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const updateCategoryHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM categorie WHERE id_cat = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: `Category with id ${req.params.id} does not exist`,
          });
        } else {
          const libelle = req.body.libelle_cat;
          db.query(
            { sql: "UPDATE categorie SET libelle_cat = ? WHERE id_cat = ?" },
            [libelle, req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(20);
            }
          );
        }
      }
    );
  }
});

const deleteCategoryHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM categorie WHERE id_cat = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: `Category with id ${req.params.id} does not exist`,
          });
        } else {
          const libelle = req.body.libelle_cat;
          db.query(
            { sql: "DELETE FROM categorie WHERE id_cat = ?" },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res
                .status(200)
                .json({ message: "Category deleted successfully" });
            }
          );
        }
      }
    );
  }
});

const getCategoryArticlesHandler = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Get all articles of category ${req.params.id}` });
});

module.exports = {
  getAllCategoriesHandler,
  getCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  getCategoryArticlesHandler,
};
