const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const sendMail = require("../utils/mail-service");
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
    let mdp;
    db.query(
      { sql: "SELECT * FROM utilisateur WHERE email_usr = ?" },
      [email_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length > 0) {
          res.status(400).json({ message: "This email is already registered" });
        } else {
          bcrypt.hash(mdp_usr, 10, (err, hash) => {
            if (err) throw new Error(err);
            db.query(
              {
                sql: "INSERT INTO utilisateur(id_role, email_usr, mdp_usr, nom_usr, prenom_usr, phone_usr) VALUES(?,?,?,?,?,?)",
              },
              [role, email_usr, hash, nom_usr, prenom_usr, phone_usr],
              (errors, result) => {
                if (errors) throw new Error(errors.sqlMessage);

                // Send credentials via Email
                const user = {
                  fullname: prenom_usr + " " + nom_usr,
                  email: email_usr,
                  password: mdp_usr,
                };
                sendMail(user.email, "account-created", user);

                // Return response
                res.status(201).json({
                  insertedId: result.insertId,
                  message: "User registered successfully",
                });
              }
            );
          });
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
    db.query(
      { sql: "SELECT * FROM utilisateur WHERE email_usr = ?" },
      [email_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
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
                {}
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

const updateCredentialsHandler = asyncHandler(async (req, res) => {
  const { new_email_usr, old_mdp_usr, new_mdp_usr } = req.body;

  if (!new_email_usr || !old_mdp_usr || !new_mdp_usr) {
    res.status(400).json({ message: "All fields are mandatory !" });
  } else {
    db.query(
      {
        sql: "SELECT id_usr, email_usr FROM utilisateur WHERE email_usr = ?",
      },
      [new_email_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length > 0 && result[0].id_usr != req.user.id_usr) {
          res.status(400).json({
            message: "This email is already in use by another user",
          });
        } else {
          bcrypt.compare(old_mdp_usr, req.user.mdp_usr, (error, match) => {
            if (!match) {
              res.status(400).json({ message: "Incorrect old password" });
            } else {
              bcrypt.hash(new_mdp_usr, 10, (err, hash) => {
                if (err) throw new Error(err);
                db.query(
                  {
                    sql: "UPDATE utilisateur SET email_usr = ?, mdp_usr = ? WHERE id_usr = ?",
                  },
                  [new_email_usr, hash, req.user.id_usr],
                  (errors, result) => {
                    if (errors) throw new Error(errors.sqlMessage);
                    req.user.mdp_usr = hash;
                    res
                      .status(200)
                      .json({ message: "Credentials updated successfully" });
                  }
                );
              });
            }
          });
        }
      }
    );
  }
});

const passwordResetRequestHandler = asyncHandler(async (req, res) => {
  const { email_usr } = req.body;
  if (!email_usr) {
    res.status(400).json({ message: "All fields are mandatory" });
  } else {
    db.query(
      { sql: "SELECT * FROM utilisateur WHERE email_usr = ?" },
      [email_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length == 0) {
          res
            .status(404)
            .json({ message: "There's no user with this email address" });
        } else {
          const resetToken = jwt.sign(
            { user: result[0] },
            process.env.TOKEN_ACCESS_SECRET,
            { expiresIn: "10m" }
          );

          // TODO: SENT BACK THE PASSWORD RESET URL TO THE USER VIA EMAIL
          const user = {
            token: resetToken,
            email: email_usr,
          };

          sendMail(user.email, "password-reset", user);

          res.status(200).json({ token: resetToken });
        }
      }
    );
  }
});

const passwordResetHandler = asyncHandler(async (req, res) => {
  const { new_mdp } = req.body;
  if (req.params.token && new_mdp) {
    bcrypt.hash(new_mdp, 10, (error, hash) => {
      if (error) throw new Error(error);
      jwt.verify(
        req.params.token,
        process.env.TOKEN_ACCESS_SECRET,
        (error, decoded) => {
          if (error) {
            res.status(401).json({ message: "Invalid token" });
          } else {
            db.query(
              { sql: "UPDATE utilisateur SET mdp_usr = ? WHERE id_usr = ?" },
              [hash, decoded.user.id_usr],
              (errors, result) => {
                if (errors) throw new Error(errors.sqlMessage);
                res
                  .status(200)
                  .json({ message: "Password reset successfully" });
              }
            );
          }
        }
      );
    });
  } else {
    res.status(400).json({ message: "All fields are mandatory" });
  }
});

module.exports = {
  registerUserHandler,
  loginUserHandler,
  currentUserHandler,
  updateCredentialsHandler,
  passwordResetRequestHandler,
  passwordResetHandler,
};
