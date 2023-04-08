const authService = require("../service/authService");
const { createJwtToken } = require("../utils/JWTToken");
const { userInfoValidation } = require("../utils/userInfoValidation");
const { sendResponse } = require("../utils/contentNegotiation");

("use strict");

exports.register = async (req, res, next) => {
  try {
    userInfoValidation(req.body);
    const registeredUser = await authService.register(req.body);
    console.log(registeredUser.message);

    if (registeredUser) {
      const accessToken = createJwtToken(registeredUser);
      res.cookie("jwt", accessToken, { httpOnly: true });

      return sendResponse(
        req,
        res,
        registeredUser.status,
        registeredUser.message
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const loggedInUser = await authService.login(req.body);

    if (loggedInUser) {
      console.log(loggedInUser);
      const accessToken = createJwtToken(loggedInUser);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return sendResponse(req, res, loggedInUser.status, loggedInUser.message);
    }
  } catch (error) {
    next(error);
  }
};
