/**
 * Purpose : To create a user schema and store data into database.
 * @file   : user_model.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 16/01/19 
 */
const bcrypt = require('bcrypt');       //Requiring Bcrypt to create hash of the user password stored in database 
const mongoose = require('mongoose');
let saltRounds = 10;

//Creating user schema using moongose
const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    email_verifiation_token: {
        type: String,
        default:''
    },
    forget_password_token: {
        type:String,
        default:''
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    }
});
var user = mongoose.model('User', UserSchema);
function userModel() {

}
//Saving data into database using the user schema
userModel.prototype.save = (data, callback) => {
    //Find the user by email in database if user with same email exists
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else 
        {
            if (result !== null) 
            {
                callback("user already exits with this username");
                console.log("result", result);
            }
            else 
            {
                //Create hash value of user password
                data.password = bcrypt.hashSync(data.password, saltRounds);
                var newData = new user(data);
                newData.save((err, result) => {
                    if (err) 
                    {
                        callback(err);
                    }
                    else 
                    {
                        callback(null, result);
                    }
                })
            }
        }
    });
}
//Finding user into database using the findOne()
userModel.prototype.findUser = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else 
        {           
            if (result !== null && data.email == result.email)
            {   
                if (result !== null || data.password === result.password) 
                {                  
                    callback(null, result);
                }
                else 
                {
                    callback("incorrect password");
                }
            }
            else
            {
                callback("incorect mail")
            }       
        }
    });
}

userModel.prototype.getAllUser = (callback) => {
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        }
        else 
        {       
            callback(null, result);
        }
    });
}

module.exports = new userModel();