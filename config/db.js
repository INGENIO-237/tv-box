const mysql = require("mysql");

require("dotenv").config();

// DB Credentials
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// DB Connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

module.exports = db;
