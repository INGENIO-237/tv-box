const express = require("express");
const dotenv = require("dotenv").config();

// PORT
const PORT = process.env.PORT || 3000;

// API version
const version = "1.0";

// Initialize app
const app = express();

// Routes
app.use(`/api/${version}/articles`, require("./routes/article"));

// Run app
app.listen(PORT, (err) =>{
    if(err) throw new Error(err);
    console.log(`App running on port ${PORT}`);
});