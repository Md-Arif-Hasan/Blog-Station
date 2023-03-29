const authService = require("../service/authService");
const JWTToken = require("../utils/JWTToken");
const dotenv = require("dotenv"); // why is this required here?
dotenv.config(); // why is this required here?

("use strict");

exports.register = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Bad request");
    
    const registeredUser = await authService.register(req.body);
    if (registeredUser) {
      const accessToken = JWTToken.createJwtToken(registeredUser, res); // fixit whole response object shouldn't be passed , I don't see any usage also
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(registeredUser);
    }
    return res.status(400).send("Please try to register again"); // fixit status code and message is not aligned!
  } catch (err) {
    return res.status(409).send("Unhandled error!"); // fixit status code and message is not aligned !
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Bad request");

    const loggedInUser = await authService.login(req.body);

    if (loggedInUser) {
      const accessToken = JWTToken.createJwtToken(loggedInUser, res); // I don't see any usage of res object
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(loggedInUser);
    }
    return res.status(400).send("Incorrect username or password"); // fixit status code and message is not aligned! use 401
  } catch (err) {
   return res.status(409).send("Unhandled error!"); // fixit status code and message is not aligned !
  }
};
