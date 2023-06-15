const db = require("../config/db");
const asyncHandler = require("express-async-handler");

const getPartnerRequestList = asyncHandler(async (req, res) => {
  db.query(
    { sql: "SELECT * FROM demande_com ORDER BY date_envoi DESC" },
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(200).json(result);
    }
  );
});

const createPartnerRequest = asyncHandler(async (req, res) => {
  const { nom, prenom, email, phone } = req.body;
  db.query(
    {
      sql: "INSERT INTO demande_com(nom, prenom, email, phone) VALUES(?,?,?,?)",
    },
    [nom, prenom, email, phone],
    (errors, result) => {
      if (errors) throw new Error(errors.sqlMessage);
      res.status(201).json({
        insertedId: result.insertId,
        message: "Request saved successfully",
      });
    }
  );
});

module.exports = { getPartnerRequestList, createPartnerRequest };
