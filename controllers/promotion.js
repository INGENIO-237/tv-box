const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const getCodePromo = require("../utils/promo-code");

const getAllPromotionsHandler = asyncHandler(async (req, res) => {
  db.query(
    {
      sql: "SELECT * FROM promotion pro, utilisateur ut WHERE ut.id_usr = pro.id_usr ORDER BY pro.code_prom ASC",
    },
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(200).json(result);
    }
  );
});

const createPromotionHandler = asyncHandler(async (req, res) => {
  const { id_usr, commission_prom, reduction_prom } = req.body;
  const codePromo = getCodePromo();

  if (!id_usr || !commission_prom || !reduction_prom) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    db.query(
      {
        sql: "INSERT INTO promotion(id_usr, code_prom, commission_prom, reduction_prom)  VALUES(?,?,?,?)",
      },
      [id_usr, codePromo, commission_prom, reduction_prom],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        res.status(200).json({
          insertedId: result.insertId,
          message: "Promotion inserted successfully",
        });
      }
    );
  }
});

const getPromotionByUserIdHandler = asyncHandler(async (req, res) => {
  if (req.params.id_usr) {
    db.query(
      {
        sql: "SELECT id_usr FROM utilisateur WHERE id_usr = ?",
      },
      [req.params.id_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `User with id ${req.params.id_usr} does not exist`,
          });
        } else {
          db.query(
            { sql: "SELECT * FROM promotion WHERE id_usr = ?" },
            [req.params.id_usr],
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

const updatePromotionByUserIdHandler = asyncHandler(async (req, res) => {
  if (req.params.id_usr) {
    db.query(
      {
        sql: "SELECT id_usr FROM utilisateur WHERE id_usr = ?",
      },
      [req.params.id_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `User with id ${req.params.id_usr} does not exist`,
          });
        } else {
          const { commission_prom, reduction_prom } = req.body;
          db.query(
            {
              sql: "UPDATE promotion SET commission_prom = ?, reduction_prom = ? WHERE id_usr = ?",
            },
            [commission_prom, reduction_prom, req.params.id_usr],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res
                .status(200)
                .json({ message: "Promotion updated successfully" });
            }
          );
        }
      }
    );
  }
});

const deletePromotionByUserIdHandler = asyncHandler(async (req, res) => {
  if (req.params.id_usr) {
    db.query(
      {
        sql: "SELECT id_usr FROM utilisateur WHERE id_usr = ?",
      },
      [req.params.id_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res.status(404).json({
            message: `User with id ${req.params.id_usr} does not exist`,
          });
        } else {
          db.query(
            {
              sql: "DELETE FROM promotion WHERE id_usr = ?",
            },
            [req.params.id_usr],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res
                .status(200)
                .json({ message: "Promotion deleted successfully" });
            }
          );
        }
      }
    );
  }
});

const regeneratePromotionCodeHandler = asyncHandler(async (req, res) => {
  const codePromo = getCodePromo();
  db.query(
    {
      sql: "SELECT ut.id_usr FROM utilisateur ut, promotion pro WHERE ut.id_usr = pro.id_usr AND ut.id_usr = ?",
    },
    [req.params.id_usr],
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      if (result.length == 0) {
        res.status(404).json({
          message: `User with id ${req.params.id_usr} does not exist or does not have any promotion associated`,
        });
      } else {
        db.query(
          { sql: "UPDATE promotion SET code_prom = ? WHERE id_usr = ?" },
          [codePromo, req.params.id_usr],
          (errors, result) => {
            if (errors) throw new Error(errors.sqlMessage);
            res
              .status(200)
              .json({ message: "Promotion code updated successfully" });
          }
        );
      }
    }
  );
});

module.exports = {
  getAllPromotionsHandler,
  createPromotionHandler,
  getPromotionByUserIdHandler,
  updatePromotionByUserIdHandler,
  deletePromotionByUserIdHandler,
  regeneratePromotionCodeHandler,
};
