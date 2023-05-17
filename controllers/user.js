const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllUsersHandler = asyncHandler(async (req, res) => {
  await db.query(
    {
      sql: "SELECT * FROM utilisateur ut, role rol WHERE rol.id_role = ut.id_role ORDER BY nom_usr ASC",
    },
    (errors, result) => {
      if (errors) throw errors;
      res.status(200).json(result);
    }
  );
});

const getUserHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      {
        sql: "SELECT * FROM utilisateur ut, role rol WHERE ut.id_role = rol.id_role AND ut.id_usr = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `User with id ${req.params.id} does not exist` });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const getUsersByRoleHandler = asyncHandler(async (req, res) => {
  if (req.params.role) {
    await db.query(
      {
        sql: "SELECT * FROM utilisateur ut, role rol WHERE ut.id_role = rol.id_role AND rol.id_role = ? ORDER BY ut.nom_usr ASC",
      },
      [req.params.role],
      (errors, result) => {
        if (errors) throw errors;
        res.status(200).json(result);
      }
    );
  }
});

const updateUserHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      {
        sql: "SELECT * FROM utilisateur ut, role rol WHERE ut.id_role = rol.id_role AND ut.id_usr = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `User with id ${req.params.id} does not exist` });
        } else {
          const { id_role, nom_usr, prenom_usr, phone_usr } = req.body;
          if (!id_role || !nom_usr || !prenom_usr || !phone_usr) {
            res.status(400).json({ message: "All fields are mandatory" });
          } else {
            db.query(
              {
                sql: "UPDATE utilisateur SET id_role = ?, nom_usr = ?, prenom_usr = ?, phone_usr = ? WHERE id_usr = ?",
              },
              [id_role, nom_usr, prenom_usr, phone_usr, req.params.id],
              (errors, result) => {
                if (errors) throw errors;
                res.status(200).json({ message: "User updated successfully" });
              }
            );
          }
        }
      }
    );
  }
});

const deleteUserHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      {
        sql: "SELECT * FROM utilisateur ut, role rol WHERE ut.id_role = rol.id_role AND ut.id_usr = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `User with id ${req.params.id} does not exist` });
        } else {
          db.query(
            {
              sql: "DELETE FROM utilisateur WHERE id_usr = ?",
            },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json({ message: "User deleted successfully" });
            }
          );
        }
      }
    );
  }
});

const getUserGainsHandler = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all gains of a single user" });
});

module.exports = {
  getAllUsersHandler,
  getUserHandler,
  getUsersByRoleHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserGainsHandler,
};
