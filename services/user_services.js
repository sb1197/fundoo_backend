/**
 * Purpose : To create user services that will send the incoming data to user_model and 
 *          save that data to database and at login time fetching correct information from database. 
 * @file   : user_services.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 16/01/19 
 */
const userModel = require('../app/models/user_models');
exports.registration = (data, callback) => 
{
    userModel.save(data, (err, result) => 
    {
        if (err) 
        {
            callback(err)
        } 
        else 
        {
            callback(null, result);
        }
    })
}
exports.login = (data, callback) => 
{
    userModel.findUser(data, (err, result) => 
    {     
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

exports.redirect = (decoded, callback) => 
{
    userModel.updateUser(decoded, (err, result) => {
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

exports.getAllUser = (req,callback) => 
{
    userModel.getAllUser(req,(err, result) => 
    {     
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}


exports.getUserEmail = (data, callback) => 
{
    userModel.findUserEmail(data, (err, result) => 
    {     
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

exports.redirect1 = (decoded, callback) => 
{
    console.log('74-- userservice--decoded--',decoded);
    
    userModel.updateUserPassword(decoded, (err, result) => {
        if (err) {     
            callback(err);
        } else {
            callback(null, result);
        }
    })
}