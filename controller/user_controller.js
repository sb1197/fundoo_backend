/**
 * Purpose : To create user controller to handle the incoming data.
 * @file   : user_controller.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 16/01/19 
 */
const userService = require('../services/user_services');
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');


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
            res.status(200).send(responseResult);
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
        else 
        {
            responseResult.success = true;
            responseResult.result = result;
            const payload =  {
                user_id : responseResult.result._id,
                user_name : responseResult.result.email
             }
            const token =  jwt.sign({payload}, 'secretkey', { expiresIn: 1440 }) // expires in 1 hours
            const obj = {
                success: true,
                message: 'Authentication done!',
                token: token
            }
            res.status(200).send(obj);
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

