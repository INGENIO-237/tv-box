const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const registerUserHandler = asyncHandler(async (req, res) => {
  const { id_role, email_usr, mdp_usr, nom_usr, prenom_usr, phone_usr } =
    req.body;
  if (!email_usr || !mdp_usr || !nom_usr || !phone_usr) {
    res
      .status(400)
      .json({ message: "email, password, name, phone or all are missing" });
  } else {
    const role = id_role ? id_role : 2;
    const salt = await bcrypt.genSalt(10);
    const mdp = await bcrypt.hash(mdp_usr, salt);

    await db.query(
      { sql: "SELECT * FROM utilisateur WHERE email_usr = ?" },
      [email_usr],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length > 0) {
          res.status(400).json({ message: "This email is already registered" });
        } else {
          db.query(
            {
              sql: "INSERT INTO utilisateur(id_role, email_usr, mdp_usr, nom_usr, prenom_usr, phone_usr) VALUES(?,?,?,?,?,?)",
            },
            [role, email_usr, mdp, nom_usr, prenom_usr, phone_usr],
            (errors, result) => {
              if (errors) throw errors;
              res.status(201).json({
                insertedId: result.insertId,
                message: "User registered successfully",
              });
            }
          );
        }
      }
    );
  }
});

const loginUserHandler = asyncHandler(async (req, res) => {
  const { email_usr, mdp_usr } = req.body;
  if (!email_usr || !mdp_usr) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    await db.query(
      { sql: "SELECT * FROM utilisateur WHERE email_usr = ?" },
      [email_usr],
      (errors, result) => {
        if (errors) throw errors;
        if (result.length == 0) {
          res.status(404).json({
            message: "There's no user registered with this email address",
          });
        } else {
          bcrypt.compare(mdp_usr, result[0].mdp_usr, (error, match) => {
            if (!match) {
              res.status(400).json({ message: "Incorrect password" });
            } else {
              accessToken = jwt.sign(
                { user: result[0] },
                process.env.TOKEN_ACCESS_SECRET,
                { expiresIn: "60m" }
              );
              res.status(200).json({ token: accessToken });
            }
          });
        }
      }
    );
  }
});

const currentUserHandler = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUserHandler, loginUserHandler, currentUserHandler };
