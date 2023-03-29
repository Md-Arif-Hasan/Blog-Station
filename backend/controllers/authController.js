const authService = require("../service/authService");
const JWTToken = require("../utils/JWTToken");
const userInfo = require("../utils/userInfoValidation");

("use strict");

exports.register = async (req, res) => {
  try {
    const registeredUser = await authService.register(req.body);
    if (registeredUser) {
      const accessToken = JWTToken.createJwtToken(registeredUser);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(registeredUser);
    }
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.login = async (req, res) => {
  try {
    const loggedInUser = await authService.login(req.body);

    if (loggedInUser) {
      const accessToken = JWTToken.createJwtToken(loggedInUser, res);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(loggedInUser);
    }
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};
