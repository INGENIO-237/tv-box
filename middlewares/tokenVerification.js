const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const accessVerification = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (error, decoded) => {
      if (error || !decoded.user) {
        res.status(401).json({ message: "You are unauthorized to get access" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Incorrect auth header information" });
  }

  // const token = req.cookies;
  // console.log(token);
  // jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (error, decoded) => {
  //   if (error || !decoded.user) {
  //     res.status(401).json({ message: "You are unauthorized to get access" });
  //   } else {
  //     req.user = decoded.user;
  //     next();
  //   }
  // });
});

module.exports = accessVerification;
