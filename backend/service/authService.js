const userRepo = require("../repository/userRepo");
const password = require("../utils/hashingPassword");
const userInfo = require("../utils/userInfoValidation");
const userService = require("../service/userService");

exports.register = async (user) => {
  try {
    const result = await userService.createUser(user);
    return result;
  } catch (error) {
    return {
      status: 400,
      message: ` It's a ${error.name}`,
    };
  }
};

exports.login = async (user) => {
  try {
    const infoValid = userInfo.userInfoValidation(user.username, user.password);
    if (!infoValid.validity) return { status: 400, message: infoValid.message };
    const username = user.username.toLowerCase();

    const checkedUser = await userService.getUserByUserName(username);
    if (checkedUser) {
      const isPasswordMatched = await password.checkPassword(
        user.password,
        checkedUser.password
      );

      if (!isPasswordMatched) {
        return false;
      }
      return checkedUser;
    } else {
      return false;
    }
  } catch (error) {
    return {
      status: 401,
      message: `It's a ${error.name}`,
    };
  }
};
