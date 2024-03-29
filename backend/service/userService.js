const userRepo = require("../repository/userRepo");
const crypto = require("crypto");
const userInfo = require("../utils/userInfoValidation");
const password = require("../utils/hashingPassword");
const userDTO = require("../DTO/userDTO");

('use strict');

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


exports.getUserByUsername = async (username, usedDTO) => {
  try {
    const fetchedUser = await userRepo.getUserByUsername(username);
    if (!fetchedUser) {
      return { status: 404, message: "Username doesn't exist in database!" };
    }
    if(!usedDTO){
      return { status: 200, message: fetchedUser };
    } else{
      return { status: 200, message: new userDTO(fetchedUser) };
    }
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
    await userRepo.createUser(myUuid, username, body.email, hashedPassword);
    return { status: 200, message: "User created successfully" };
  } catch (error) {
    return {
      status: 500,
      message: `It's a ${error.name}`,
    };
  }
};

exports.updateUser = async (username, body) => {
  try {
    const hashedPassword = await password.hashingPassword(body.password);
    const data = await userRepo.updateUser(username, hashedPassword);
    if (!data) {
      return { status: 404, message: "User not found!" };
    }
    return { status: 200, message: "User updated successfully" };
  } catch (error) {
   return { status: 500, message: `It's a ${error.name}`};
  }
};

exports.deleteUser = async (username) => {
  try {
    const result = await userRepo.deleteUser(username.toLowerCase());
    if (result)
      return { status: 200, message: "User deleted successfully" };
    else return { status: 404, message: "User not found" };
  } catch (error) {
    return { status: 500, message: `It's a ${error.name}` };
  }
};