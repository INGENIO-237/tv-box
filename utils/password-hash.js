const bcrypt = require("bcryptjs");
require("dotenv").config();


// Hashes some raw text and returns a hashed password
const passwordHash = async (textToHash) =>{
  return bcrypt.hash(textToHash, process.env.SALT);
}

module.exports = { passwordHash }