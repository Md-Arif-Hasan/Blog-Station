const sequelize = require("../db.config");
const { DataTypes } = require("sequelize");

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
        msg: "Please enter a title.",
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter a valid blog description.",
      },
    },
  },
});


module.exports = Blog;
