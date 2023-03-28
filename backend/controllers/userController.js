const userService = require('../service/userService');
const { sendResponse } = require('../utils/contentNegotiation');

// eslint-disable-next-line no-unused-expressions
('use strict');

exports.getAllUsers = async (req, res) => {
    const data = await userService.getAllUsers(req);
    return sendResponse(req, res, data.status, data.message);
};

exports.getUserByUsername = async (req, res) => {
    const data = await userService.getUserByUsername(req.params.username);
    return sendResponse(req, res, data.status, data.message);
};

exports.createUser = async (req, res) => {
    const data = await userService.createUser(req.body);
    res.status(data.status).send(data.message);
};

exports.updateUser = async (req, res) => {
    const username = req.params.username.toLowerCase();
    const data = await userService.updateUser(username, req.body);
    res.status(data.status).send(data.message);
};

exports.deleteUser = async (req, res) => {
    const username = req.params.username.toLowerCase();
    const data = await userService.deleteUser(username);
    res.status(data.status).send(data.message);
};
