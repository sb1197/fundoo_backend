const utility = require('../utility/utility');
// const sendmail = require('../middleware/SendMail')
   exports.verifyEmail = (req,res,next) => {
       if(req.body!==null)
       {
            console.log('5--req in verify email :',req.body); 
            console.log('6--email in req body---',req.body.email);
            // sendmail(req.body.email)
            next();
       }
       else
       {
           res.send({
               success : false,
               message : "Could not verify user"
           })
       }
    }


