const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.createJwtToken = (user, res) => {
  const jwtToken = jwt.sign({username: user.message.username}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  console.log(jwtToken);
  return jwtToken;
};
