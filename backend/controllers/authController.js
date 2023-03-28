const authService = require("../service/authService");
const JWTToken = require("../utils/JWTToken");
const dotenv = require("dotenv");
dotenv.config();

("use strict");

exports.register = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Bad request");
    
    const registeredUser = await authService.register(req.body);
    if (registeredUser) {
      const accessToken = JWTToken.createJwtToken(registeredUser, res);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(registeredUser);
    }
    return res.status(400).send("Please try to register again");
  } catch (err) {
    return res.status(409).send("Unhandled error!");
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Bad request");

    const loggedInUser = await authService.login(req.body);

    if (loggedInUser) {
      const accessToken = JWTToken.createJwtToken(loggedInUser, res);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(loggedInUser);
    }
    return res.status(400).send("Incorrect username or password");
  } catch (err) {
   return res.status(409).send("Unhandled error!");
  }
};
