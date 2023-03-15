const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.createJwtToken = (res, user) => {
  const payload = {
    user: user.username,
  };
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return jwtToken;
};

/*
    exports.removeToken = (res) => {
        res.status(200)
        .cookie("jwt", null, {
            expiresIn: new Date(Date.now())
        }, 
        {secure: true, httpOnly: true})
        .json({
            message: "Logged Out"
        });
    }
*/
