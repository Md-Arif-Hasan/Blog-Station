const userService = require("../service/userService");
const { sendResponse } = require("../utils/contentNegotiation");
const { paginate } = require("../utils/pagination");
const { userUpdateValidation } = require("../utils/userInfoValidation");

("use strict");

exports.getAllUsers = async (req, res, next) => {
  try {
    const { offset, limit } = paginate(req.query.pageNo, req.query.pageSize);
    const allUsers = await userService.getAllUsers(offset, limit);
    return sendResponse(req, res, allUsers.status, allUsers.message);
  } catch (error) {
    next(error);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const oneUser = await userService.getUserDtoByUsername(req.params.username);
    return sendResponse(req, res, oneUser.status, oneUser.message);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    const password = req.body.password;

    if(!username) throw Object.assign(new Error("Enter a valid username parameter!"), { statusCode: 400 });

    userUpdateValidation(password);

    const updatedUser = await userService.updateUser(username, password);
    return sendResponse(req, res, updatedUser.status, updatedUser.message);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if(!req.params.username) throw Object.assign(new Error("Enter a valid username parameter!"), { statusCode: 400 });

    const username = req.params.username.toLowerCase();

    const deletedUser = await userService.deleteUser(username);
    return sendResponse(req, res, deletedUser.status, deletedUser.message);
  } catch (error) {
    next(error);
  }
};
