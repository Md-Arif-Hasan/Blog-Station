const password = require("../utils/hashingPassword");
const userInfo = require("../utils/userInfoValidation");
const userService = require("../service/userService");

('use strict');

exports.register = async (user) => {
  try {
    const createdUser = await userService.createUser(user);
    return createdUser;
  } catch (error) {
    return {
      status: 400,
      message: `${error.errors[0].message}`,
    };
  }
};

exports.login = async (user) => {
  try {
    const infoValid = userInfo.userInfoValidation(user);
    if (!infoValid.validity) return { status: 400, message: infoValid.message };
    const username = user.username.toLowerCase();

    const checkedUser = await userService.getUserByUsernameWithoutDTO(username);
    if (checkedUser.message) {
      const isPasswordMatched = await password.checkPassword(user.password,checkedUser.message.password);
      if (!isPasswordMatched) {
        return false;
      }
      return checkedUser;
    } 
  } catch (error) {
    return {
      status: 401,
      message:  `${error.errors[0].message}`,
    };
  }
};