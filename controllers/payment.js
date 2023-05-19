const asyncHandler = require("express-async-handler");

const createPaymentHandler = asyncHandler(async (req, res) => {
  const { id_cmd, montant_paie, code_promo } = req.body;

  if (!id_cmd || !montant_paie) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    // Start transaction
    db.beginTransaction((error) => {
      if (error) throw error;

      let reduction = 0;
      let montant = montant_paie;

      let id_prom, commission, id_paie;
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

            // Promotion ID
            id_prom = result[0].id_prom;

            // Commission
            commission = result[0].commission_prom;

            // Computes and performs the discount
            reduction = (montant_paie * result[0].reduction_prom) / 100;
            montant = montant_paie - reduction;
          }
        );
      }

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
          id_paie = result.insertId;
        }
      );

      // Commit actions
      db.commit((error) => {
        if (error) {
          db.rollback(() => {
            throw error;
          });
        }
        if (code_promo) {
          // Computes gain generated
          const gain = (montant * commission) / 100;

          // Perform promotion gain
          db.query(
            {
              sql: "INSERT INTO gain(id_prom, id_paie, montant_gain VALUES(?,?,?)",
            },
            [id_prom, id_paie, gain],
            (errors, result) => {
              if (errors) throw errors;
            }
          );
        }

        res.status(200).json({ message: "Payment performed successfully" });
      });
    });
  }
});

module.exports = {
  createPaymentHandler,
};
