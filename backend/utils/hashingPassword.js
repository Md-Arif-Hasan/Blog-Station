const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

async function hashingPassword(password) {
  const saltRounds = parseInt(process.env.salt.int);
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
module.exports = { hashingPassword };
