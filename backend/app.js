const express = require("express");
const app = express();
const routing = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();
//const HOST = process.env.HOST_NAME;
const cors = require("cors");
const {errorHandlerMiddleware} = require("./middleware/errorHandler");
app.use(express.json());


app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials:true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));


const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Blog station user service is listening on port ${PORT}`);
});

app.use(cookieParser());

app.use("/api/v1/", routing);
app.use(errorHandlerMiddleware);

module.exports = app;
