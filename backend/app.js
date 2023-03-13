const express = require("express");
const app = express();
const PORT = 4008;
const index = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Blog station user service is listening on port ${PORT}`);
});

app.use("/api/v1/", index);
module.exports = app;
