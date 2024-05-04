const express = require('express');
const router = express.Router();
const userCntrl = require('../controllers/users.controller')
const userValidtr = require('../validators/users.validators');
const { verifyUserToken,
    generateUserToken,
    checkUser,
    checkUserUniq
} = require('../middlewares');

router.post('/register',
    userValidtr.registerUserValidation,
    checkUserUniq,
    userCntrl.registerUser)
router.post('/login',
    userValidtr.loginuserValidation,
    checkUser,
    generateUserToken,
    userCntrl.userLogin)
router.get('/details',
    verifyUserToken,
    userCntrl.getUserData)
router.patch('/update/:id',
    userValidtr.userUpdateValidation,
    verifyUserToken,
    userCntrl.updateUser)
router.post('/logout', userCntrl.userLogout);


module.exports = router;