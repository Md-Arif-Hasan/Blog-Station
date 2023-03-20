const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticationMiddleware = async (req, res, next) => {
  let accessToken = req.cookies.jwt;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(403).send();
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send();
  }
};

module.exports = authenticationMiddleware;
