const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllRequestsHandler = asyncHandler(async (req, res) => {
   db.query(
    { sql: "SELECT * FROM demande dmd, objet obj WHERE dmd.id_obj = obj.id_obj ORDER BY date_dmd DESC" },
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(200).json(result);
    }
  );
});

const getRequestHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      {
        sql: "SELECT * FROM demande dmd, objet obj WHERE dmd.id_obj = obj.id_obj AND dmd.id_dmd = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Request with id ${req.params.id} does not exist`,
          });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const createRequestHandler = asyncHandler(async (req, res) => {
  const {
    id_obj,
    date_travaux,
    lieu_travaux,
    desc_travaux,
    nom_complet_cli_dmd,
    phone_cli_dmd,
  } = req.body;
  if (
    !id_obj ||
    !date_travaux ||
    !lieu_travaux ||
    !desc_travaux ||
    !nom_complet_cli_dmd ||
    !phone_cli_dmd
  ) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
     db.query(
      {
        sql: "INSERT INTO demande(id_obj, date_travaux, lieu_travaux, desc_travaux, nom_complet_cli_dmd, phone_cli_dmd) VALUES(?,?,?,?,?,?)",
      },
      [
        id_obj,
        date_travaux,
        lieu_travaux,
        desc_travaux,
        nom_complet_cli_dmd,
        phone_cli_dmd,
      ],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        res.status(201).json({
          insertedId: result.insertId,
          message: "Request created successfully",
        });
      }
    );
  }
});

const updateRequestHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      {
        sql: "SELECT * FROM demande dmd, objet obj WHERE dmd.id_obj = obj.id_obj AND id_dmd = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Request with id ${req.params.id} does not exist`,
          });
        } else {
          // console.log(req.body);
          const {
            id_obj,
            date_travaux,
            lieu_travaux,
            desc_travaux,
            nom_complet_cli_dmd,
            phone_cli_dmd,
          } = req.body;
          if (
            !id_obj ||
            !date_travaux ||
            !lieu_travaux ||
            !desc_travaux ||
            !nom_complet_cli_dmd ||
            !phone_cli_dmd
          ) {
            res.status(400).json({ message: "All fields are mandatory" });
          } else {
            db.query(
              {
                sql: "UPDATE demande SET id_obj = ?, date_travaux = ?, lieu_travaux = ?, desc_travaux = ?, nom_complet_cli_dmd = ?, phone_cli_dmd = ? WHERE id_dmd = ?",
              },
              [
                id_obj,
                date_travaux,
                lieu_travaux,
                desc_travaux,
                nom_complet_cli_dmd,
                phone_cli_dmd,
                req.params.id,
              ],
              (errors, result) => {
                if (errors) throw new Error(errors.sqlMessage);
                res.status(200).json({
                  message: "Request updated successfully",
                });
              }
            );
          }
        }
      }
    );
  }
});

const deleteRequestHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
     db.query(
      {
        sql: "SELECT * FROM demande dmd, objet obj WHERE dmd.id_obj = obj.id_obj AND id_dmd = ?",
      },
      [req.params.id],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `Request with id ${req.params.id} does not exist`,
          });
        } else {
          db.query(
            {
              sql: "DELETE FROM demande WHERE id_dmd = ?",
            },
            [req.params.id],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res.status(200).json({
                message: "Request updated successfully",
              });
            }
          );
        }
      }
    );
  }
});

module.exports = {
  getAllRequestsHandler,
  getRequestHandler,
  createRequestHandler,
  updateRequestHandler,
  deleteRequestHandler,
};
