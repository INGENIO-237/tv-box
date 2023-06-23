const mysql = require("mysql");

require("dotenv").config();

// DB Credentials
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

// DB Connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

module.exports = db;
