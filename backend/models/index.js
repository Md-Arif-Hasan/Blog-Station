const User = require('./userModel');
const Blog = require('./blogModel');
const sequelize = require("../db.config");

User.hasMany(Blog, {
  foreignKey: "authorId",
  onDelete: "cascade",
  hooks: true,
});

Blog.belongsTo(User, { as: "author" }, {
  foreignKey: "authorId",
});


const test = async () => {
  await sequelize.sync({ force:false });
  console.log("Index is synchronized successfully.");
};
test();

  module.exports = {
    User,Blog
  }