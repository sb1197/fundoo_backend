var jwt = require('jsonwebtoken');
exports.loginAuth = (req,res,next)=> {
    
    if(req.body!==null)
    {
        console.log('6--In loginAuth---Incoming request body is--',req.body);
        if(req.body.email == null || req.body.password == null)
        {
            res.send({
                status: false,
                message: 'Empty request'
            })
        }
        else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(req.body.email))
        {
            res.send({
                status: false,
                message: 'Invalid Email Id'
            })
        }
        else if(req.body.password === '' || req.body.password.length < 8)
        {
            res.send({
                status: false,
                message: 'Invalid Password'
            })
        }
        console.log('\nPassing client request to controller...');
        next();
    }
    else
    {
        res.send({
            status:false,
            message:"Authentication error..."
        })
    }
}

exports.checkToken = (req,res,next) => {
    console.log('41--req body in middleware--',req.body);
    console.log('42--req headers in middleware--',req.headers['token']);
    

    var token1 = req.headers['token'];
    // console.log('46--in middleware--token to decode--',token1);
    
    // decode token
    if (token1)
    {
        // verifies secret and checks exp
        jwt.verify(token1, 'secretkey', (err, decoded) => 
        {
            console.log('54--inside verify function');
            console.log(err);
            
            console.log(decoded);
            
            if (err) 
            {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } 
            else 
            {
                console.log('65--inside verify function in else');
                req.decoded = decoded;
                console.log('58--email of user who click the link---',req.decoded);
                next();
            }
        });
    } 
    else 
    {
        // if there is no token return an error
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}

