const express = require("express");
const userRepo = require("../repository/userRepo");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const myUuid = uuidv4();

exports.getAllUsers = async (callBack) => {
  await userRepo.getAllUsers((err, data) => {
    if (err) callBack(err, null);
    callBack(null, data);
  });
};

exports.getUserByID = async (username, callBack) => {
  await userRepo.getUser(username, (err, data) => {
    if (err) callBack(err, null);
    callBack(null, data);
  });
};

exports.createUser = async (username, email, password, callBack) => {
  const myUuid = uuidv4().replace(/-/g, "");
  username = username.toLowerCase();
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    callBack(
      {
        status: 400,
        message: "Username can only contain English alphabets and digits",
      },
      null
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

 //const existingEmail = await userRepo.existEmail(email);
//   console.log("email"+existingEmail)
//   if (existingEmail.rows.length > 0) {
//     return { status: 409, message: "Email already exists" };
//   }

  await userRepo.create(
    myUuid,
    username,
    email,
    hashedPassword,
    (err, data) => {
      if (err) callBack(err, null);
      callBack(null, data);
    }
  );

};

exports.updateUser = async (username, data, callBack) => {
  await userRepo.updateUser(username, data, (err, data) => {
    if (err) callBack(err, null);
    callBack(null, username, data);
  });
};

exports.deleteOneUser = async (username, callBack) => {
  await userRepo.deleteUser(username, (err, data) => {
    if (err) callBack(err, null);
    callBack(null, data);
  });
};
