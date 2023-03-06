const express = require('express');
const router = express.Router();
const app =express();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers).post(userController.createUser);
router.get('/:id', userController.getIndUser).put(userController.updateUser);;
router.delete('/:id', userController.deleteUser);

module.exports = router;