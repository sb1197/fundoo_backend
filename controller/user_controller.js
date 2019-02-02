/**
 * Purpose : To create user controller to handle the incoming data.
 * @file   : user_controller.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 16/01/19 
 */
const userService = require('../services/user_services');
const { check, validationResult } = require('express-validator/check');
const mailSent = require('../middleware/SendMail');
const utility = require('../utility/utility')

exports.registration = (req, res) => {
    var responseResult = {};
    //Validating incoming request body from client side for registering user
    check('firstName', 'firstname cannot be empty').isEmpty();
    check('firstName', 'firstname must contain only alphabets').isAlpha();
    check('lastName', 'lastname cannot be empty').isEmpty();
    check('lastName', 'lastname must contain only alphabets').isAlpha();
    check('email', 'username cannot be empty').isEmpty();
    check('email', 'username must be an email').isEmail();
    check('password', 'password cannot be empty').isEmpty();
    check('password', 'password must be atleast 8 characters long').isLength({ min: 8 });

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: false,
            message: err,
        });
    }
    userService.registration(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            const payload = {
                user_name: responseResult.result._id
            }
            console.log(payload);

            const obj = utility.GenerateToken(payload);
            console.log('47--UserCtrl--Token return from utility while registration :===', obj);
            const url = `http://localhost:3000/verifyEmail/${obj.token}`;
            mailSent.sendEMailFunction(url);
            //Send email using this token generated
            res.status(200).send(url);
        }
    })
}
exports.login = (req, res) => {
    var responseResult = {};
    //Validating incoming request body from client side for login user
    check('email', 'username cannot be empty').isEmpty();
    check('email', 'username must be an email').isEmail();
    check('password', 'password cannot be empty').isEmpty();
    check('password', 'password must be atleast 8 characters long').isLength({ min: 8 });

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: false,
            message: err,
        });
    }
    userService.login(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            const payload = {
                user_id: responseResult.result._id,
                user_name : responseResult.result.email
            }
            const obj = utility.GenerateToken(payload);
            res.status(200).send(obj)
        }
    })
}

exports.sendResponse = (req, res) => {
    var responseResult = {};
    console.log('107---in user ctrl send token is verified response');
    userService.redirect(req.decoded, (err, result) => {
        if (err) 
        {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else 
        {
            console.log('116---in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}

exports.getAllUser = (req,res) => {
    var responseResult = {}; 
    userService.getAllUser((err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}

exports.getUser = (req, res) => {
    var responseResult = {};
    userService.getUserEmail(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            const payload = {
                user_id: responseResult.result._id
            }
            console.log(payload);
            const obj = utility.GenerateToken(payload);
            const url = `http://localhost:3000/resetpassword/${obj.token}`;
            mailSent.sendEMailFunction(url);
            //Send email using this token generated
            res.status(200).send(url);
        }
    })
}


exports.setPassword = (req, res) => {
    var responseResult = {};
    userService.resetPass(req, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            console.log('116---in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
