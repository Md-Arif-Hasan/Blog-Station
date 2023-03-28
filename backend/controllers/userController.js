const userService = require("../service/userService");
const {sendResponse} = require("../utils/contentNegotiation");

('use strict');

exports.getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers(req);
  return sendResponse(req,res,allUsers.status, allUsers.message);
};

exports.getUserByUsername = async (req, res) => {
  const oneUser = await userService.getUserByUsernameWithDTO(req.params.username);
  return sendResponse(req,res,oneUser.status, oneUser.message);
};

exports.createUser = async (req, res) => {
  const createdUser = await userService.createUser(req.body);
  return sendResponse(req,res,createdUser.status, createdUser.message);
};

exports.updateUser = async (req, res) => {
  const username = req.params.username.toLowerCase();
  const updatedUser = await userService.updateUser(username, req.body);
  res.status(updatedUser.status).send(updatedUser.message);
};

exports.deleteUser = async (req, res) => {
  const username = req.params.username.toLowerCase();
  const deletedUser = await userService.deleteUser(username);
  res.status(deletedUser.status).send(deletedUser.message);
};
