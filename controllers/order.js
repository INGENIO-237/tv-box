const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const getAllOrdersHandler = asyncHandler(async (req, res) => {
  await db.query(
    { sql: "SELECT * FROM commande ORDER BY date_cmd DESC" },
    (errors, result) => {
      if (errors) throw errors;
      res.status(200).json(result);
    }
  );
});

const getOrderHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM commande WHERE id_cmd = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Order with id ${req.params.id} does not exist` });
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  }
});

const createOrderHandler = asyncHandler(async (req, res) => {
  const { adresse_liv, date_liv, nom_complet_cli, phone_cli } = req.body;
  if (!date_liv || !adresse_liv || !nom_complet_cli || !phone_cli) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    // UTC Date
    const newDateLiv = new Date(date_liv);

    await db.query(
      {
        sql: "INSERT INTO commande(date_liv, adresse_liv, nom_complet_cli, phone_cli) VALUES(?,?,?,?)",
      },
      [newDateLiv, adresse_liv, nom_complet_cli, phone_cli],
      (errors, result) => {
        if (errors) throw errors;
        res.status(201).json({
          insertedId: result.insertId,
          message: "Order inserted successfully",
        });
      }
    );
  }
});

const updateOrderHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM commande WHERE id_cmd = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Order with id ${req.params.id} does not exist` });
        } else {
          const { adresse_liv, date_liv, nom_complet_cli, phone_cli } =
            req.body;
          if (!date_liv || !adresse_liv || !nom_complet_cli || !phone_cli) {
            res.status(400).json({ message: "All fields are mandatory" });
          } else {
            db.query(
              {
                sql: "UPDATE commande SET date_liv = ?, adresse_liv = ?, nom_complet_cli = ?, phone_cli = ? WHERE id_cmd = ?",
              },
              [
                date_liv,
                adresse_liv,
                nom_complet_cli,
                phone_cli,
                req.params.id,
              ],
              (errors, result) => {
                if (errors) throw errors;
                res.status(200).json({ message: "Order updated successfully" });
              }
            );
          }
        }
      }
    );
  }
});

const deleteOrderHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM commande WHERE id_cmd = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Order with id ${req.params.id} does not exist` });
        } else {
          db.query(
            {
              sql: "DELETE FROM commande WHERE id_cmd = ?",
            },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json({ message: "Order deleted successfully" });
            }
          );
        }
      }
    );
  }
});

const changeOrderStatusHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT statut_liv FROM commande WHERE id_cmd = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Order with id ${req.params.id} does not exist` });
        } else {
          // Change the status
          // 0 = Not delivered yet
          // 1 = Delivered
          const statut = result[0].statut_liv == 0 ? 1 : 0;
          db.query(
            { sql: "UPDATE commande SET statut_liv = ? WHERE id_cmd = ?" },
            [statut, req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res
                .status(200)
                .json({ message: "Order status updated successfully" });
            }
          );
        }
      }
    );
  }
});

const getOrderSalesHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    await db.query(
      { sql: "SELECT * FROM commande WHERE id_cmd = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Order with id ${req.params.id} does not exist` });
        } else {
          db.query(
            {
              sql: "SELECT art.id_art, art.nom_art, art.prix_art, con.qte FROM commande cmd, article art, concerner con WHERE cmd.id_cmd = ? AND cmd.id_cmd = con.id_cmd AND art.id_art = con.id_art",
            },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json(result);
            }
          );
        }
      }
    );
  }
});

const getOrderPaymentsHandler = asyncHandler(async (req, res) => {
  if (req.params.id) {
    db.query(
      { sql: "SELECT * FROM commande WHERE id_cmd = ?" },
      [req.params.id],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: `Order with id ${req.params.id} does not exist` });
        } else {
          db.query(
            { sql: "SELECT * FROM paiement WHERE id_cmd = ?" },
            [req.params.id],
            (errors, result) => {
              if (errors) throw errors;
              res.status(200).json(result);
            }
          );
        }
      }
    );
  }
});

module.exports = {
  getAllOrdersHandler,
  getOrderHandler,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
  changeOrderStatusHandler,
  getOrderSalesHandler,
  getOrderPaymentsHandler,
};
