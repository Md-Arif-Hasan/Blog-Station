const UserDTO = require("../DTO/userDTO");
const User = require("../models/userModel");

("use strict");

exports.getAllUsers = async (offset, limit) => {
  const data = await User.findAll({
    offset,
    limit,
    order: [["createdAt", "ASC"]],
  });
  const allUsers = [];
  data.forEach((element) => {
    allUsers.push(new UserDTO(element));
  });
  return allUsers;
};

exports.getUserByUsername = async (username) => {
  const data = await User.findOne({
    where: {
      username: username,
    },
  });
  return data;
};

exports.createUser = async (myUuid, username, email, hashedPassword) => {
  try {
    const user = await User.create({
      id: myUuid,
      username: username,
      email: email,
      password: hashedPassword,
    });
    return user;
  } catch (err) {
    throw Object.assign(new Error(err.errors[0].message), { statusCode: 400 });
  }
};

exports.updateUser = async (username, updatedPassword) => {
  const result = await User.update(
    { password: updatedPassword },
    { where: { username: username } }
  );
  return result;
};

exports.deleteUser = async (username) => {
  const user = await User.destroy({
    where: {
      username: username,
    },
  });
  return user;
};

exports.checkEmail = async (email) => {
  const data = await User.findAll({
    where: {
      email: email,
    },
  });
  return data;
};
