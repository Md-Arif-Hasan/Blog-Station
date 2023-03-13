//const mysql = require("mysql");
const dotenv = require("dotenv");
const Sequelize = require("sequelize");
dotenv.config();

/*
const Blog_name = process.env.NAME;

const db = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: "",
  database: "blogstation",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`${Blog_name} successfully connected to database.`);
});
*/

const sequelize = new Sequelize("blogstation", "root", "", {
  host: process.env.HOST,
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

//module.exports = db;
