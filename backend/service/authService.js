const password = require('../utils/hashingPassword');
const userInfo = require('../utils/userInfoValidation');
const userService = require('./userService');

// eslint-disable-next-line no-unused-expressions
('use strict');

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

// eslint-disable-next-line consistent-return
exports.login = async (user, usedDTO) => {
    try {
        const infoValid = userInfo.userInfoValidation(user);
        if (!infoValid.validity) return { status: 400, message: infoValid.message };
        const username = user.username.toLowerCase();

        const checkedUser = await userService.getUserByUsername(username, usedDTO);
        if (checkedUser.message) {
            const isPasswordMatched = await password.checkPassword(
                user.password,
                // eslint-disable-next-line comma-dangle
                checkedUser.message.password
            );
            if (!isPasswordMatched) {
                return false;
            }
            return checkedUser;
        }
    } catch (error) {
        return {
            status: 401,
            message: `It's a  ${error.name}`,
        };
    }
};
