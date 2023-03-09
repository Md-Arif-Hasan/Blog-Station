const express = require("express");
const userService = require("../service/userService");
const { genSaltSync, hashSync } = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  await userService.getAllUsers((err, data) => {
    if (err) res.status(400).send(err);
    res.status(200).send(data);
  });
};

exports.getUserByUserName = async (req, res) => {
  await userService.getUserByID(req.params.uname, (err, data) => {
    if (err) {
      res.status(400).send("failed");
    }
    res.status(200).send(data);
  });
};

exports.createNewUser = async (req, res) => {
  const { username, email, password } = await req.body;

  console.log(username);
  if (!username || !email || !password) {
    return res.status(400).send({ message: "Invalid request body" });
  }

  // console.log("req"+req.body)
  await userService.createUser(username, email, password, (err, data) => {
    if (err) {
      res.status(400).send(err.message);
    }
    res.status(200).send("User created successfully");
  });
};

exports.updateUser = (req, res) => {
  const body = req.body;
  const userName = req.params.uname.toLowerCase();
  if (req.params.uname.includes(" ")) {
    return res.status(401).json({
      success: 0,
      data: "Parameter contains space character",
    });
  }

  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  userService.updateUser(userName, body, (err, results, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).send("Üser updated successfully");
  });
};

exports.deleteSingleUser = async (req, res) => {
  await userService.deleteOneUser(req.params.uname, (err, data) => {
    if (err) {
      res.status(400).send("Deletion failed");
    }
    res.status(200).send("User deleted successfully");
  });
};
