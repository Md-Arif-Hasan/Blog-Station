const express = require("express");
const app = express();
const routing = require("./routes/index");
const dotenv = require("dotenv");
const {errorHandlerMiddleware} = require("./middleware/errorHandler");
dotenv.config();
app.use(express.json());
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Blog station user service is listening on port ${PORT}`);
});

app.use(cookieParser());

app.use("/api/v1/", routing);
app.use(errorHandlerMiddleware);

module.exports = app;
