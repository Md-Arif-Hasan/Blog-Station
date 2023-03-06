const express = require('express');
const app = express();
const PORT = 4004;
const userRouter = require('./routes/userRoutes');
//const dbConn = require("./db.config");
const dotenv = require('dotenv');
dotenv.config();


app.get('', (req, res) => {
  res.send('Welcome to home page!');
});



app.listen(PORT, () => {
    console.log(`Blog station user service is listening on port ${PORT}`);
});

app.use(express.json())

app.use('/api/v1/users',userRouter);

module.exports = app;