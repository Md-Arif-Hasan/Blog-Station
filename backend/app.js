const express = require('express');
const app = express();
const PORT = 4000;

app.use('/user', userRoutes);



app.get('/api/v1', (req, res) => {
  res.send('Welcome to home page!');
});



app.listen(PORT, () => {
    console.log(`MiniFacebook user service is listening on port ${PORT}`);
});