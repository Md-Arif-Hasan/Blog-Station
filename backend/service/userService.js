const userRepo = require("../repository/userRepo");
const crypto = require("crypto");
const userInfo = require("../utils/userInfoValidation");
const password = require("../utils/hashingPassword");

exports.getAllUsers = async () => {
  try {
    const fetchedUsers = await userRepo.getAllUsers();
    if (fetchedUsers.length == 0) {
      return { status: 404, message: "No data in users table!" };
    }
    return { status: 200, message: fetchedUsers };
  } catch(error) {
    return { status: 404, message: `${error.errors[0].message}` };
  }
};

exports.getUserByUserName = async (username) => {
  try {
    const data = await userRepo.getUserByUserName(username);
    if (data.length == 0) {
      return { status: 404, message: "Username doesn't exist in database!" };
    }
    return { status: 200, message: data };
  } catch(error) {
        console.log("err"+err);
    return { status: 404, message:  `${error.errors[0].message}`};
  }
};

exports.createUser = async (body) => {
  const infoValid = userInfo.userInfoValidation(
    body.username,
    body.password
  );
  if (!infoValid.validity) return { status: 400, message: infoValid.message };

  const myUuid = crypto.randomUUID();
  const username = body.username.toLowerCase();
  const hashedPassword = await password.hashingPassword(body.password);

  try {
    await userRepo.createUser(myUuid, username, body.email, hashedPassword);
    return { status: 200, message: "User created successfully" };
  } catch (error){
    return { status: 401, message: `${error.errors[0].message} It's a ${error.name}` };
  }
};

exports.updateUser = async (username, body) => {
  try {
    const hashedPassword = await password.hashingPassword(body.password);
    const data = await userRepo.updateUser(username, hashedPassword);
    if (data == 0) {
      return { status: 404, message: "User not found!" };
    }
    return { status: 200, message: "User updated successfully" };
  } catch(error) {
    return { status: 401, message: `${error.errors[0].message}` };
  }
};

exports.deleteUser = async (username) => {
  try {
    const result = await userRepo.deleteUser(username.toLowerCase());
    if (result == 1)
      return { status: 200, message: "User deleted successfully" };
    else return { status: 404, message: "User not found" };
  } catch(error) {
    return { status: 404, message:`${error.errors[0].message}` };
  }
};
