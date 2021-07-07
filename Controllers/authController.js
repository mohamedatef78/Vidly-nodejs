const User = require('../Models/User');
const   catchAsync = require('../Middleware/catchAsync');
const AppError = require('../utils/Error');
const _ = require('lodash');
const jwt  = require('jsonwebtoken');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

const createToken = (user,statusCode,req,res)=>{
    const token = signToken(user._id);
    res.cookie('jwt', token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
      });
    
      // Remove password from output
      user.password = undefined;
    
      res.status(statusCode).json({
        status: 'success',
        token,
        data: {
          user
        }
      });
}


exports.signup =catchAsync( async(req ,res) =>{
    
        let user = await User.findOne({email:req.body.email});
        if(user) return res.status(400).send('user already registered');

        const newuser = await User.create(_.pick(req.body,['username','email','password','passwordConfirm']));
        res.send(_.pick(newuser,['_id','username','email']));
        // const newuser = await User.create({
        //     username:req.body.username,
        //     email:req.body.email,
        //     password:req.body.password,
        //     passwordConfirm: req.body.passwordConfirm

        // });
        // res.send(newuser);
    
});


exports.login = catchAsync(async(req,res , next)=>{
    // 1) Check if email and password exist
    if(!_.pick(req.body,['email','password']))  return next(new AppError('Please provide email and password!', 400)) ;
    // 2) Check if user exists && password is correct
    const user = await User.findOne({email : req.body.email}).select('+password');
    if(!user || !(await user.comparepassword(req.body.password , user.password))) {
        return next(new AppError('Incorrect email or password', 401)); 
    }
    // 3) If everything ok, send token to client
    createToken(user , 200 ,req ,res);
});