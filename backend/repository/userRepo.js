const UserDTO = require("../DTO/userDTO");
const User = require("../models/userModel");

exports.getAllUsers = async () => {
  try {
    const data = await User.findAll();
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

exports.getUserByUserName = async (username) => {
  try{
    const data = await User.findAll({
      where: {
        username: username,
      },
    });
    const user = [];
    data.forEach((element) => {
      user.push(new UserDTO(element));
    });
    return user;
  }
  catch(err){
    console.log(err.stack);
    throw err;
  }

};

exports.createUser = async (myUuid, username, email, hashedPassword) => {
  try{
    const user = await User.create({
      id: myUuid,
      username: username,
      email: email,
      password: hashedPassword,
    });
    return user;
  }
  catch(err){
    console.log(err.stack);
    throw err;
  }
 
};

exports.updateUser = async (username, hashedPassword) => {
  try{
    const user = await User.update(
      { password: hashedPassword },
      {
        where: {
          username: username,
        },
      }
    );
    return user;
  } catch(err){
    console.log(err.stack);
    throw err;
  }

};

exports.deleteUser = async (username) => {
  try{
    const user = await User.destroy({
      where: {
        username: username,
      },
    });
    return user;
  } catch(err){
    console.log(err.stack);
    throw err;
  }

};

exports.checkUsername = async (username) => {
  try{
    const data = await User.findAll({
      where: {
        username: username,
      },
    });
    return data;
  } catch(err){
    console.log(err.stack);
    throw err;
  }

};

exports.checkEmail = async (email) => {
  try{
    const data = await User.findAll({
      where: {
        email: email,
      },
    });
    return data;
  } catch(err){
    console.log(err.stack);
  }
};
