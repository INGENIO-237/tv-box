const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllRolesHandler = asyncHandler(async (req, res) => {
   db.query(
    { sql: "SELECT * FROM role ORDER BY libelle_role ASC" },
    (errors, result) => {
      if (errors) throw errors;
      res.status(200).json(result);
    }
  );
});

const getRoleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM role WHERE id_role = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Role with id ${req.params.id} does not exist` });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const createRoleHandler = asyncHandler(async (req, res) => {
  const { libelle_role } = req.body;
  if (!libelle_role) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
     db.query(
      { sql: "INSERT INTO role(libelle_role) VALUES(?)" },
      [libelle_role],
      (errors, result) => {
        if (errors) throw errors;
        res.status(201).json({
          insertedId: result.insertId,
          message: "Role inserted successfully",
        });
      }
    );
  }
});

const updateRoleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM role WHERE id_role = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Role with id ${req.params.id} does not exist` });
        } else {
          const { libelle_role } = req.body;
          if (!libelle_role) {
            res.status(400).json({ message: "All fields are mandatory" });
          } else {
            db.query(
              { sql: "UPDATE role SET libelle_role = ? WHERE id_role = ?" },
              [libelle_role, req.params.id],
              (errors, result) => {
                if (errors) throw errors;
                res.status(200).json({ message: "Role updated successfully" });
              }
            );
          }
        }
      }
    );
  }
});

const deleteRoleHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      { sql: "SELECT * FROM role WHERE id_role = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Role with id ${req.params.id} does not exist` });
        } else {
          db.query(
            { sql: "DELETE FROM role WHERE id_role = ?" },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json({ message: "Role deleted successfully" });
            }
          );
        }
      }
    );
  }
});

module.exports = {
  getAllRolesHandler,
  getRoleHandler,
  createRoleHandler,
  updateRoleHandler,
  deleteRoleHandler,
};
