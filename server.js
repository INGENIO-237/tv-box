const express = require("express");
const dotenv = require("dotenv").config();

// PORT
const PORT = process.env.PORT || 3000;

// API version
const version = "1.0";

// Initialize app
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(`/api/${version}/articles`, require("./routes/article"));
app.use(`/api/${version}/categories`, require("./routes/category"));
app.use(`/api/${version}/account`, require("./routes/auth"));
app.use(`/api/${version}/users`, require("./routes/user"));
app.use(`/api/${version}/roles`, require("./routes/role"));

// Run app
app.listen(PORT, (err) =>{
    if(err) throw new Error(err);
    console.log(`App running on port ${PORT}`);
});