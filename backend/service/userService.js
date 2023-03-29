const userRepo = require("../repository/userRepo");
const crypto = require("crypto");
const userInfo = require("../utils/userInfoValidation");
const password = require("../utils/hashingPassword");
const userDTO = require("../DTO/userDTO");

("use strict");

exports.getAllUsers = async (req) => {
  try {
    const fetchedUsers = await userRepo.getAllUsers(req);
    if (!fetchedUsers.length) {
      return { status: 404, message: "No data in users table!" };
    }
    return { status: 200, message: fetchedUsers };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};

exports.getUserByUsernameWithDTO = async (username) => {
  try {
    const fetchedUser = await userRepo.getUserByUsername(username);
    if (!fetchedUser) {
      return { status: 404, message: "Username doesn't exist in database!" };
    }
    return { status: 200, message: new userDTO(fetchedUser) };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};

exports.getUserByUsernameWithoutDTO = async (username) => {
  try {
    const fetchedUser = await userRepo.getUserByUsername(username);
    if (!fetchedUser) {
      return { status: 404, message: "Username doesn't exist in database!" };
    }
    return { status: 200, message: fetchedUser };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};

exports.createUser = async (body) => {
  const infoValid = userInfo.userInfoValidation(body);
  if (!infoValid.validity) return { status: 400, message: infoValid.message };

  const myUuid = crypto.randomUUID();
  const username = body.username.toLowerCase();
  const hashedPassword = await password.hashingPassword(body.password);

  try {
    const createdUser = await userRepo.createUser(
      myUuid,
      username,
      body.email,
      hashedPassword
    );
    return { status: 201, message: createdUser };
  } catch (error) {
    return {
      status: 500,
      message: `${error.errors[0].message}`,
    };
  }
};

exports.updateUser = async (username, body) => {
  try {
    const hashedPassword = await password.hashingPassword(body.password);
    const updatedUser = await userRepo.updateUser(username, hashedPassword);

    if (!updatedUser) {
      return { status: 404, message: "User not found!" };
    }
    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    return { status: 500, message: `${error.errors[0].message}` };
  }
};

exports.deleteUser = async (username) => {
  try {
    const deletedUser = await userRepo.deleteUser(username.toLowerCase());
    if (deletedUser) {
      return { status: 200, message: "User deleted successfully" };
    }
    return { status: 404, message: "User not found" };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};
