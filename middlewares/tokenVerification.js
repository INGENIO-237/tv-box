const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const accessVerification = asyncHandler(async (req, res, next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1];
        await jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (error, decoded) =>{
            if(error){
                res.status(401).json({ message: "You are unauthorized to get access" });
            };
            req.user = decoded.user;
            next();
        });
    }else{
        res.status(400).json({ message: "Incorrect auth header information" });
    }
});

module.exports = accessVerification;