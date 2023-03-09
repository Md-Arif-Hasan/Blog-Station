//const dbcon = require("../db.config");
const express = require("express");
const db = require("../db.config");
const UserDTO = require("../DTO/userDTO");

exports.getAllUsers = async (callBack) => {
  try {
    db.query("SELECT * FROM users", (err, results, fields) => {
      if (err) callBack(err, null);
      results = results.map((v) => Object.assign({}, v));
      const userDTO = new UserDTO(results);
      return callBack(null, userDTO.users);
    });
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.getUser = async (username, callBack) => {
  //console.log(username);
  try {
    db.query(
      "SELECT * FROM users where username=?",
      [username],
      (err, results, fields) => {
        if (err) callBack(err, null);
        results = results.map((v) => Object.assign({}, v));

        const userDTO = new UserDTO(results);
        return callBack(null, userDTO.users[0]);
      }
    );
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.create = async (
  myUuid,
  username,
  email,
  hashedPassword,
  callBack
) => {
  try {
    db.query(
      "INSERT INTO users(id,username, email, password) values(?,?,?,?)",
      [myUuid, username, email, hashedPassword],
      (err, results, fields) => {
        if (err) {
         // console.log("User creation faileeddddd", err);
          callBack(err, null);
        }
        else {
         // console.log("User created successfully");
          callBack(null, results);
        }
      }
    );
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.updateUser = async (username, data, callBack) => {
  //console.log(username);
  try {
    db.query(
      `update users set Password=? where Username = ?`,
      [data.password, username],
      (err, results, fields) => {
        if (err) {
          console.log("User update failed", err);
          callBack(err, null);
        }
        else {
          callBack(null, results);
        }
      }
    );
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

exports.deleteUser = async (username, callBack) => {
  //console.log(username);
  try {
    db.query(
      `delete from users where username = ?`,
      [username.toLowerCase()],
      (err, results, fields) => {
        if (err) callBack(err, null);
        // results = results.map(v => Object.assign({}, v));
        return callBack(null, results);
      }
    );
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};

// exports.existEmail = async (email, callBack) => {
//   console.log(email);
//   try {
//     db.query(
//       "SELECT * FROM users where email = ?",
//       [email],
//       (err, results, fields) => {
//         if (err) {
//           console.log("repo"+err);
//           callBack(err, null);
//         }
//         console.log("repo"+results);

//         results = results.map((v) => Object.assign({}, v));

//         const userDTO = new UserDTO(results);
//          callBack(null, userDTO.users[0]);
//       }
//     );
//   } catch (err) {
//     console.log(err.stack);
//     throw err;
//   }
// };
