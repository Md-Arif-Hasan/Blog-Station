const userService = require("../service/userService");
const { sendResponse } = require("../utils/contentNegotiation");
const { paginate } = require("../utils/pagination");

("use strict");

exports.getAllUsers = async (req, res) => {
  try {
    const { offset, limit } = paginate(req);
    const allUsers = await userService.getAllUsers(offset, limit);
    return sendResponse(req, res, allUsers.status, allUsers.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const oneUser = await userService.getUserDtoByUsername(req.params.username);
    return sendResponse(req, res, oneUser.status, oneUser.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.createUser = async (req, res) => {
  try {
    const createdUser = await userService.createUser(req.body);
    return sendResponse(req, res, createdUser.status, createdUser.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.updateUser = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const updatedUser = await userService.updateUser(username, req.body);
    res.status(updatedUser.status).send(updatedUser.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const deletedUser = await userService.deleteUser(username);
    res.status(deletedUser.status).send(deletedUser.message);
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};
