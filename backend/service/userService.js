const userRepo = require("../repository/userRepo");
// const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const userInfo = require("../utils/userInfoValidation");
const password = require("../utils/hashingPassword");
const duplicateUtils = require("../utils/duplicateValidation");

exports.getAllUsers = async () => {
  try {
    const fetchedUsers = await userRepo.getAllUsers();
    if (fetchedUsers.length == 0) {
      return { status: 404, message: "No data in users table!" };
    }
    return { status: 200, message: fetchedUsers };
  } catch {
    return { status: 404, message: "Users not found" };
  }
};

exports.getUserByUserName = async (username) => {
  try {
    const data = await userRepo.getUserByUserName(username);
    if (data.length == 0) {
      return { status: 404, message: "User not found!" };
    }
    return { status: 200, message: data };
  } catch {
    return { status: 404, message: "Users not found" };
  }
};

exports.createUser = async (body) => {
  const infoValid = userInfo.userInfoValidation(
    body.username,
    body.email,
    body.password
  );
  if (!infoValid.validity) return { status: 400, message: infoValid.message };

  const duplicateUsername = duplicateUtils.userNameDuplicate(body.username);
  if ((await duplicateUsername).exist) {
    return { status: 422, message: (await duplicateUsername).message };
  }

  const duplicateEmail = duplicateUtils.emailDuplicate(body.email);
  if ((await duplicateEmail).exist) {
    return { status: 422, message: (await duplicateEmail).message };
  }

  //const myUuid = uuidv4();
  const myUuid = crypto.randomUUID();
  const username = body.username.toLowerCase();
  const hashedPassword = await password.hashingPassword(body.password);

  try {
    await userRepo.createUser(myUuid, username, body.email, hashedPassword);
    return { status: 200, message: "User created successfully" };
  } catch {
    return { status: 401, message: "Please check your credentials again" };
  }
};

exports.updateUser = async (username, body) => {
  try {
    const hashedPassword = await password.hashingPassword(body.password);
    const data = await userRepo.updateUser(username, hashedPassword);
    if (data.affectedRows == 0) {
      return { status: 404, message: "User not found!" };
    }
    return { status: 200, message: "User updated successfully" };
  } catch {
    return { status: 401, message: "Please check your credentials again" };
  }
};

exports.deleteUser = async (username) => {
  try {
    const result = await userRepo.deleteUser(username.toLowerCase());
    if (result.affectedRows == 1)
      return { status: 200, message: "User deleted successfully" };
    else return { status: 404, message: "User not found" };
  } catch {
    return { status: 404, message: "User not found" };
  }
};
