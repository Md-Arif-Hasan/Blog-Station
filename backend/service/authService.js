const password = require("../utils/hashingPassword");
const userInfo = require("../utils/userInfoValidation");
const userService = require("../service/userService");

("use strict");

exports.register = async (user) => {
  try {
    const infoValid = userInfo.userInfoValidation(user);
    if (!infoValid.validity)
      throw Object.assign(new Error(infoValid.message), { statusCode: 400 });

    const createdUser = await userService.createUser(user);
    return createdUser;
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};


exports.login = async (user) => {
  try {
    const infoValid = userInfo.userInfoValidation(user);
    if (!infoValid.validity)
      throw Object.assign(new Error(infoValid.message), { statusCode: 400 });
    const username = user.username.toLowerCase();

    const checkedUser = await userService.getUserByUsername(username);
    if (checkedUser.message) {
      const isPasswordMatched = await password.checkPassword(
        user.password,
        checkedUser.message.password
      );
      if (!isPasswordMatched) {
        throw Object.assign(new Error("Your password isn't correct!"), {
          statusCode: 401,
        });
      }
      return checkedUser;
    }
  } catch (error) {
    return { status: error.statusCode, message: error.message };
  }
};
