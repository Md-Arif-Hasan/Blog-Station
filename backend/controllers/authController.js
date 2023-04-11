const authService = require("../service/authService");
const { createJwtToken } = require("../utils/JWTToken");
const { userInfoValidation , userLoginValidation } = require("../utils/userInfoValidation");
const { sendResponse } = require("../utils/contentNegotiation");

("use strict");

exports.register = async (req, res, next) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    userInfoValidation(username, email, password);

    const registeredUser = await authService.register(req.body);

      const accessToken = createJwtToken(registeredUser);
      res.cookie("jwt", accessToken, { httpOnly: true });

      return sendResponse(
        req,
        res,
        registeredUser.status,
        registeredUser.message
      );
    
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    userLoginValidation(username, password);

    const loggedInUser = await authService.login(req.body);
  
      const accessToken = createJwtToken(loggedInUser);
      res.cookie("jwt", accessToken, { httpOnly: true });
      return sendResponse(req, res, loggedInUser.status, loggedInUser.message);
    
  } catch (error) {
    next(error);
  }
};
