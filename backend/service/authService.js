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

exports.login = async (user, usedDTO) => {
  try {
    const infoValid = userInfo.userInfoValidation(user);
    if (!infoValid.validity) return { status: 400, message: infoValid.message };
    const username = user.username.toLowerCase();

    const checkedUser = await userService.getUserByUserName(username, usedDTO);

    if (checkedUser.message) {
      const isPasswordMatched = await password.checkPassword(
        user.password,
        checkedUser.message.password
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
      message: `${error.errors[0].message} It's a ${error.name}`,
    };
  }
};
