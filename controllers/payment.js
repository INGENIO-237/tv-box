const asyncHandler = require("express-async-handler");
const db = require("../config/db");

global.id_prom;
global.commission;
global.id_paie;
global.reduction = 0;
global.montant = 0;

const createPaymentHandler = asyncHandler(async (req, res) => {
  const { id_cmd, montant_paie, code_promo } = req.body;

  if (!id_cmd || !montant_paie) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    global.montant = montant_paie;

    // Start transaction
    db.beginTransaction((error) => {
      if (error) throw error;

      if (code_promo) {
        db.query(
          {
            sql: "SELECT id_prom, commission_prom, reduction_prom FROM promotion WHERE code_prom = ?",
          },
          [code_promo.toUpperCase()],
          (errors, result) => {
            if (errors) {
              db.rollback(() => {
                throw errors;
              });
            }

            if (result.length > 0) {
              // Promotion ID
              global.id_prom = result[0].id_prom;

              // Commission
              global.commission = result[0].commission_prom;

              // Computes and performs the discount
              global.reduction =
                (montant_paie * result[0].reduction_prom) / 100;
              global.montant = montant_paie - global.reduction;

              // TODO: PERFORM PAYMENT VIA STRIPE API HERE

              db.query(
                {
                  sql: "INSERT INTO paiement(id_cmd, montant_paie, code_promo) VALUES(?,?,?)",
                },
                [id_cmd, montant, code_promo],
                (errors, result) => {
                  if (errors) {
                    db.rollback(() => {
                      throw errors;
                    });
                  }
                  global.id_paie = result.insertId;
                }
              );

              // Commit actions
              db.commit((error) => {
                if (error) {
                  db.rollback(() => {
                    throw error;
                  });
                }
                // Computes gain generated
                const gain = (montant * global.commission) / 100;

                // Perform promotion gain
                db.query(
                  {
                    sql: "INSERT INTO gain(id_prom, id_paie, montant_gain) VALUES(?,?,?)",
                  },
                  [global.id_prom, global.id_paie, gain],
                  (errors, result) => {
                    if (errors) throw errors;
                  }
                );

                res
                  .status(200)
                  .json({ message: "Payment performed successfully" });
              });
            }
          }
        );
      } else {
        // TODO: PERFORM PAYMENT VIA STRIPE API HERE
        db.query(
          {
            sql: "INSERT INTO paiement(id_cmd, montant_paie, code_promo) VALUES(?,?,?)",
          },
          [id_cmd, montant, code_promo],
          (errors, result) => {
            if (errors) {
              db.rollback(() => {
                throw errors;
              });
            }
          }
        );
        // Commit actions
        db.commit((error) => {
          if (error) {
            db.rollback(() => {
              throw error;
            });
          }

          res.status(200).json({ message: "Payment performed successfully" });
        });
      }
    });
  }
});

module.exports = {
  createPaymentHandler,
};
