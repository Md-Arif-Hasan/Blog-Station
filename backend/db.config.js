const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

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

module.exports = db;
