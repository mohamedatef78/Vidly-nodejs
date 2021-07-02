const User = require('../Models/User');
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


exports.signup = async(req ,res) =>{
    try{
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
    }catch(ex){
        
        res.status(400).send(ex);

    }
}


exports.login = async(req,res)=>{
    if(!_.pick(req.body,['email','password'])) return res.status(400).send('Please provide email and password!') ;
    const user = await User.findOne({email : req.body.email}).select('+password');
    if(!user || !(await user.comparepassword(req.body.password , user.password))) {
        return res.status(400).send('Incorrect email or password') ;
    }
    
    createToken(user , 200 ,req ,res);
}