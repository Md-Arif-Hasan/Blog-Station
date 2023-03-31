const authService = require("../service/authService");
const JWTToken = require("../utils/JWTToken");
const userInfo = require("../utils/userInfoValidation");

("use strict");

exports.register = async (req, res, next) => {
  try {
    userInfo.userInfoValidation(req.body);
    const registeredUser = await authService.register(req.body);
    if (registeredUser) {
      const accessToken = JWTToken.createJwtToken(registeredUser);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(registeredUser);
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const loggedInUser = await authService.login(req.body);

    if (loggedInUser) {
      const accessToken = JWTToken.createJwtToken(loggedInUser);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return res.send(loggedInUser);
    }
  } catch (error) {
   next(error);
  }
};
