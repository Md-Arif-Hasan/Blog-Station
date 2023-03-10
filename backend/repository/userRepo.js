const express = require("express");
const db = require("../db.config");
const UserDTO = require("../DTO/userDTO");

function executeQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        console.log(error.sqlMessage);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getAllUsers = async () => {
  const query = "SELECT * FROM users";
  const result = await executeQuery(query);

  const allUsers = [];

  result.forEach((element) => {
    allUsers.push(new UserDTO(element));
  });
  return allUsers;
};

exports.getUserByUserName = async (username) => {
  const query = "SELECT * FROM users where username=?";
  const result = await executeQuery(query, [username]);

  const user = [];

  result.forEach((element) => {
    user.push(new UserDTO(element));
  });
  return user;
};

exports.createUser = async (myUuid, username, email, hashedPassword) => {
  const query =
    "INSERT INTO users(id,username, email, password) values(?,?,?,?)";
  const result = await executeQuery(query, [
    myUuid,
    username,
    email,
    hashedPassword,
  ]);
  return result;
};

exports.updateUser = async (username, hashedPassword) => {
  const query = "update users set password=? where username = ?";
  const result = await executeQuery(query, [hashedPassword, username]);
  return result;
};

exports.deleteUser = async (username) => {
  const query = "delete from users where username = ?";
  const result = await executeQuery(query, [username]);
  return result;
};

exports.checkUsername = async (username) => {
  const query = "SELECT * FROM users where username=?";
  const result = await executeQuery(query, [username]);
  return result;
};

exports.checkEmail = async (email) => {
  const query = "SELECT * FROM users where email=?";
  const result = await executeQuery(query, [email]);
  return result;
};

