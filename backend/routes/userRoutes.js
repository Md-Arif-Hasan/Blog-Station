const express = require('express');
const router = express.Router();
const app = express();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers)
router.post('/',userController.createNewUser);
router.get('/:uname', userController.getUserByUserName);
router.put('/:uname',userController.updateUser);
router.delete('/:uname', userController.deleteSingleUser);

module.exports = router;