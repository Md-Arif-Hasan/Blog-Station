const userRepo = require("../repository/userRepo");
const userInfo = require("../utils/userInfoValidation");
const password = require("../utils/hashingPassword");
const userDTO = require("../DTO/userDTO");
const { v4: uuidv4 } = require("uuid");

("use strict");

exports.getAllUsers = async (offset, limit) => {
  const fetchedUsers = await userRepo.getAllUsers(offset, limit);
  if (!fetchedUsers.length) {
    throw Object.assign(new Error("No user in users table!"), {
      statusCode: 404,
    });
  }
  return { status: 200, message: fetchedUsers };
};

exports.getUserDtoByUsername = async (username) => {
  const fetchedUser = await userRepo.getUserByUsername(username);
  if (!fetchedUser) {
    throw Object.assign(new Error("Username doesn't exist in database!"), {
      statusCode: 404,
    });
  }
  return { status: 200, message: new userDTO(fetchedUser) };
};

exports.getUserByUsername = async (username) => {
  const fetchedUser = await userRepo.getUserByUsername(username);
  if (!fetchedUser) {
    throw Object.assign(new Error("Username doesn't exist in database!"), {
      statusCode: 404,
    });
  }
  return { status: 200, message: fetchedUser };
};

exports.createUser = async (user) => {
  const infoValid = userInfo.userInfoValidation(user);
  if (!infoValid.validity) return { status: 400, message: infoValid.message };

  const useruuid = uuidv4();
  const username = user.username.toLowerCase();
  const hashedPassword = await password.hashingPassword(user.password);

  try {
    const createdUser = await userRepo.createUser(
      useruuid,
      username,
      user.email,
      hashedPassword
    );
    return { status: 201, message: createdUser };
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};

exports.updateUser = async (username, user) => {
  const hashedPassword = await password.hashingPassword(user.password);
  const updatedUser = await userRepo.updateUser(username, hashedPassword);

  if (!updatedUser) {
    throw Object.assign(new Error("User not found!"), { statusCode: 404 });
  }
  return { status: 200, message: "User updated successfully" };
};

exports.deleteUser = async (username) => {
  const deletedUser = await userRepo.deleteUser(username.toLowerCase());
  if (deletedUser) {
    return { status: 200, message: "User deleted successfully" };
  }
  throw Object.assign(new Error("User not found!"), { statusCode: 404 });
};
