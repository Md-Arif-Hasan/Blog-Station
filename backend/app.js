const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const dotenv = require('dotenv');
const index = require('./routes/index');

dotenv.config();
app.use(express.json());

const { PORT } = process.env;
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
    return 0;
});

app.use('/api/v1/', index);

module.exports = app;
