/**
 * Purpose : To provide routes to each webpages. 
 * @file   : routes.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 16/01/19 
 */
const express = require('express');
const router = express.Router();
//Setting controller path into controller variables
const userController = require('../controller/user_controller');
const loginMiddleware = require('../middleware/loginmiddleware')
const emailVerification = require('../middleware/VerifyEmail');
// Using router.post() sending data to database
router.post('/registration', userController.registration);
router.post('/login',loginMiddleware.loginAuth,userController.login);
router.get('/getAllUser', loginMiddleware.checkToken,userController.getAllUser);
router.post('/verifyEmail/:token2', loginMiddleware.checkToken,userController.sendResponse);

module.exports = router;