const UserDTO = require('../DTO/userDTO');
const User = require('../models/userModel');
const { paginate } = require('../utils/pagination');

exports.getAllUsers = async (req) => {
    try {
        const { offset, limit } = paginate(req);
        const data = await User.findAll({ offset, limit, order: [['createdAt', 'ASC']] });
        const allUsers = [];
        data.forEach((element) => {
            allUsers.push(new UserDTO(element));
        });

        return allUsers;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.getUserByUsername = async (username) => {
    try {
        const data = await User.findOne({
            where: {
                username,
            },
        });
        return data;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.createUser = async (myUuid, username, email, hashedPassword) => {
    try {
        const user = await User.create({
            id: myUuid,
            username,
            email,
            password: hashedPassword,
        });
        return user;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.updateUser = async (username, updatedPassword) => {
    try {
        const result = await User.update({ password: updatedPassword }, { where: { username } });
        return result;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.deleteUser = async (username) => {
    try {
        const user = await User.destroy({
            where: {
                username,
            },
        });
        return user;
    } catch (err) {
        console.log(err.stack);
        throw err;
    }
};

exports.checkEmail = async (email) => {
    try {
        const data = await User.findAll({
            where: {
                email,
            },
        });
        return data;
    } catch (err) {
        console.log(err.stack);
    }
};
