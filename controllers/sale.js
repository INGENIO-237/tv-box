const asyncHandler = require("express-async-handler");
const db = require("../config/db");

const createSaleHandler = asyncHandler(async (req, res) => {
  const { id_cmd, id_art, qte } = req.body;
  if (!id_art || !id_cmd || !qte) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    await db.query(
      { sql: "INSERT INTO concerner VALUES(?,?,?)" },
      [id_cmd, id_art, qte],
      (errors, result) => {
        if (errors) throw errors;
        res.status(201).json({ message: "Sale inserted successfully" });
      }
    );
  }
});

const updateSaleHandler = asyncHandler(async (req, res) => {
  const { id_cmd, id_art, qte } = req.body;
  if (!id_cmd || !id_art || !qte) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    await db.query(
      { sql: "UPDATE concerner SET qte = ? WHERE id_cmd = ? AND id_art = ?" },
      [qte, id_cmd, id_art],
      (errors, result) => {
        if (errors) throw errors;
        res.status(200).json({ message: "Sale updated successfully" });
      }
    );
  }
});

const deleteSaleHandler = asyncHandler(async (req, res) => {
  const { id_cmd, id_art } = req.body;
  if (!id_cmd || !id_art) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    await db.query(
      { sql: "DELETE FROM concerner WHERE id_cmd = ? AND id_art = ?" },
      [id_cmd, id_art],
      (errors, result) => {
        if (errors) throw errors;
        res.status(200).json({ message: "Sale deleted successfully" });
      }
    );
  }
});

module.exports = {
  createSaleHandler,
  updateSaleHandler,
  deleteSaleHandler,
};
