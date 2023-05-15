const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');
//router object
const router = express.Router();

//GetALlUsers
router.get('/all-users', getAllUsers);
//CreateAllUsers || POST
router.post('/register', registerController);


//LOGIN|| POST
router.post('/login', loginController);
module.exports = router;