const sequelize = require("../db.config");
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    noUpdate: true,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },

  username: {
    type: DataTypes.STRING,
    noUpdate: true,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please enter your username. "
      },
      isAlphanumeric:{
        msg:"Username must contain alphanumeric values. "
      }
      
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg:"Please enter a valid email. "
      },
      isEmail:{
        msg:"Email is not valid! "
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg:"Please enter your password! "
      },
    },
  },
});

const test = async () => {
  // await User.sync({ force: true });
  console.log("The table for the User model was just (re)created!");
  ///await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
  const allUsers = await User.findAll();
};
test();

module.exports = User;
