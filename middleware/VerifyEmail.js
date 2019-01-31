const utility = require('../utility/utility');
const mailSent = require('../middleware/SendMail');


exports.verifyEmail = (req, res, next) => {
    if (req.body !== null) {
        console.log('5--req in verify email :', req.body);
        console.log('6--email in req body---', req.body.email);
        const payload = {
            user_name: req.body.email
        }
        const obj = utility.GenerateToken(payload);
        console.log('12--Verifyemail--Token return from utility while registration :===', obj);
        const url = `http://localhost:3000/verifyEmail/${obj.token}`;
        mailSent.sendEMailFunction(url);
        next();
    }
    else {
        res.send({
            success: false,
            message: "Could not verify user"
        })
    }
}


