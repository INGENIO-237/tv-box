const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { passwordHash } = require("../utils/password-hash");
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
    const mdp = await passwordHash(mdp_usr);

    db.query(
      { sql: "SELECT * FROM utilisateur WHERE email_usr = ?" },
      [email_usr],
      (errors, result) => {
        if (errors) throw new Error(errors.sqlMessage);
        if (result.length > 0) {
          res.status(400).json({ message: "This email is already registered" });
        } else {
          db.query(
            {
              sql: "INSERT INTO utilisateur(id_role, email_usr, mdp_usr, nom_usr, prenom_usr, phone_usr) VALUES(?,?,?,?,?,?)",
            },
            [role, email_usr, mdp, nom_usr, prenom_usr, phone_usr],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
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
    db.query(
      {
        sql: "SELECT * FROM utilisateur ut, role rol WHERE ut.email_usr = ? AND ut.id_role = rol.id_role",
      },
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
                { expiresIn: "60m" }
              );
              res.cookie("authcookie", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
              });
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

const logoutUserHandler = asyncHandler(async (req, res) => {
  if (!req.cookies.authcookie) {
    res.status(401).json({ message: "You are not meant to be there" });
  } else {
    res.clearCookie("authcookie");
    res.status(200).json({ message: "Logout successfully !" });
  }
});

const updateCredentialsHandler = asyncHandler(async (req, res) => {
  const { new_email_usr, old_mdp_usr, new_mdp_usr } = req.body;

  if ((!new_email_usr, !old_mdp_usr, !new_mdp_usr)) {
    res.status(400).json({ message: "All fields are mandatory !" });
  } else {
    const newPwd = await passwordHash(new_mdp_usr);
    db.query(
      { sql: "SELECT id_usr, email_usr FROM utilisateur WHERE email_usr = ?" },
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
              db.query(
                {
                  sql: "UPDATE utilisateur SET email_usr = ?, mdp_usr = ? WHERE id_usr = ?",
                },
                [new_email_usr, newPwd, req.user.id_usr],
                (errors, result) => {
                  if (errors) throw new Error(errors.sqlMessage);
                  db.query(
                    {
                      sql: "SELECT * FROM utilisateur ut, role rol WHERE ut.email_usr = ? AND ut.id_role = rol.id_role",
                    },
                    [new_email_usr],
                    (errors, result) => {
                      if (errors) throw new Error(error.sqlMessage);
                      accessToken = jwt.sign(
                        { user: result[0] },
                        process.env.TOKEN_ACCESS_SECRET,
                        { expiresIn: "60m" }
                      );
                      res
                        .cookie("authcookie", accessToken, {
                          maxAge: 1000 * 60 * 60 * 24 * 365,
                          httpOnly: true,
                        })
                        .status(200)
                        .json({ message: "Credentials updated successfully" });
                    }
                  );
                }
              );
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
            { passwordResetUser: result[0] },
            process.env.TOKEN_ACCESS_SECRET,
            { expiresIn: "10m" }
          );

          // TODO: SENT BACK THE PASSWORD RESET URL TO THE USER VIA EMAIL
          res.status(200).json({ token: resetToken });
        }
      }
    );
  }
});

const passwordResetHandler = asyncHandler(async (req, res) => {
  const { new_mdp } = req.body;
  if (req.params.token && new_mdp) {
    const newPwd = await passwordHash(new_mdp);
    jwt.verify(
      req.params.token,
      process.env.TOKEN_ACCESS_SECRET,
      (error, decoded) => {
        if (error) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          db.query(
            { sql: "UPDATE utilisateur SET mdp_usr = ? WHERE id_usr = ?" },
            [newPwd, decoded.passwordResetUser.id_usr],
            (errors, result) => {
              if (errors) throw new Error(errors.sqlMessage);
              res.status(200).json({
                message: "Password reset successfully. You can now log in",
              });
            }
          );
        }
      }
    );
  } else {
    res.status(400).json({ message: "All fields are mandatory" });
  }
});

module.exports = {
  registerUserHandler,
  loginUserHandler,
  currentUserHandler,
  logoutUserHandler,
  updateCredentialsHandler,
  passwordResetRequestHandler,
  passwordResetHandler,
};
