const User = require('../Models/User');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');


exports.protect = async(req,res,next)=>{
    // 1) Getting token and check of it's there
    let token  ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        console.log('1');
    }else if(req.cookies.jwt){
        token = req.cookies.jwt;
        console.log('2');   
    }

    if(!token) return res.status(401).send('You are not logged in! Please log in to get access.');


    // 2) Verification token
    const decode = await promisify(jwt.verify)(token , process.env.JWT_SECRET);

    // 3) Check if user still exists
    const curentuser = await User.findById(decode.id);
    if(!curentuser) return res.status(401).send('The user belonging to this token does no longer exist.');


    // 4) Check if user changed password after the token was issued

    // GRANT ACCESS TO PROTECTED ROUTE

    req.user = curentuser ;

    next();

}


exports.restictTo = (... roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)) return res.status(403).send('You do not have permission to perform this action');

        next();
    }
}