const bcrypt = require("bcryptjs");
require("dotenv").config();

// Hashes some raw text and returns a hashed password
const passwordHash = async (textToHash) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(textToHash, salt);
};

module.exports = { passwordHash };
