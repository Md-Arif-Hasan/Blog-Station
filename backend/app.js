const express = require("express");
const app = express();
const index = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Blog station user service is listening on port ${PORT}`);
});

app.use(cookieParser());
app.use((err, req, res, next) => {
  if (!err) {
      return next();
  }
  res.status(500);
  res.send('500: Internal server error');
});

app.use("/api/v1/", index); // fixit : index is not a proper naming!

module.exports = app;
