const sequelize = require("../db.config");
const { DataTypes } = require("sequelize");
const User = require("../models/userModel");

const Blog = sequelize.define("blogs", {
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

  title: {
    type: DataTypes.STRING,
    noUpdate: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter a title. ",
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter a valid blog description . ",
      },
    },
  },

});

User.hasMany(Blog, {
  foreignKey: "authorid",
  onDelete: 'cascade',
  hooks: true,
});

Blog.belongsTo(User, {
  foreignKey: "authorid",
});

const test = async () => {
  console.log("The table 2 for the User model was just (re)created!");
  await sequelize.sync({ force: false });
  console.log("All models 2 were synchronized successfully.");
};
test();

module.exports = Blog;
