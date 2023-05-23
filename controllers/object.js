const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllObjectsHandler = asyncHandler(async (req, res) => {
   db.query(
    { sql: "SELECT * FROM objet ORDER BY libelle_obj" },
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(200).json(result);
    }
  );
});

const getObjectHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM objet WHERE id_obj = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Object with id ${req.params.id} does not exist`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const createObjectHandler = asyncHandler(async (req, res) => {
  const { libelle_obj } = req.body;
  if (!libelle_obj) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
     db.query(
      { sql: "INSERT INTO objet(libelle_obj) VALUES(?)" },
      [libelle_obj],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        res.status(201).json({
          insertedId: result.insertId,
          message: "Object created successfully",
        });
      }
    );
  }
});

const updateObjectHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM objet WHERE id_obj = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Object with id ${req.params.id} does not exist`,
          });
        } else {
          const { libelle_obj } = req.body;
          db.query(
            { sql: "UPDATE objet SET libelle_obj = ? WHERE id_obj = ?" },
            [libelle_obj, req.params.id],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res.status(200).json({ message: "Object updated successfully" });
            }
          );
        }
      }
    );
  }
});

const deleteObjectHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM objet WHERE id_obj = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Object with id ${req.params.id} does not exist`,
          });
        } else {
          db.query(
            { sql: "DELETE FROM objet WHERE id_obj = ?" },
            [req.params.id],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res.status(200).json({ message: "Object deleted successfully" });
            }
          );
        }
      }
    );
  }
});

const getObjetRequestsHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM objet WHERE id_obj = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Object with id ${req.params.id} does not exist`,
          });
        } else {
          db.query(
            { sql: "SELECT * FROM demande WHERE id_obj = ?" },
            [req.params.id],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res.status(200).json(result);
            }
          );
        }
      }
    );
  }
});

module.exports = {
  getAllObjectsHandler,
  getObjectHandler,
  createObjectHandler,
  updateObjectHandler,
  deleteObjectHandler,
  getObjetRequestsHandler,
};
