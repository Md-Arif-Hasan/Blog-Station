const dotenv = require('dotenv');
const authService = require('../service/authService');
const JWTToken = require('../utils/JWTToken');

dotenv.config();

('use strict');

exports.register = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send('Bad request');
        }
        const registeredUser = await authService.register(req.body);
        if (registeredUser) {
            const accessToken = JWTToken.createJwtToken(registeredUser);

            res.cookie('jwt', accessToken, { httpOnly: true });
            res.send(registeredUser);
        } else {
            res.status(400).send('Please try to register again');
        }
    } catch (err) {
        res.status(400).send('Error!');
    }
};

exports.login = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send('Bad request');
        }

        const usedDTO = false;
        const loggedInUser = await authService.login(req.body, usedDTO);

        if (loggedInUser) {
            const accessToken = JWTToken.createJwtToken(loggedInUser);

            res.cookie('jwt', accessToken, { httpOnly: true });
            res.send(loggedInUser);
        } else {
            res.status(400).send('Incorrect username or password');
        }
    } catch (err) {
        res.status(400).send('Error!');
    }
    const usedDTO = false;
    const loggedInUser = await authService.login(req.body,usedDTO);

    if (loggedInUser) {
      const accessToken = JWTToken.createJwtToken(loggedInUser, res);

      res.cookie("jwt", accessToken, { httpOnly: true });
      res.send(loggedInUser);
    } else {
      res.status(400).send("Incorrect username or password");
    }
  } catch (err) {
    res.status(400).send("Error!");
  }
};