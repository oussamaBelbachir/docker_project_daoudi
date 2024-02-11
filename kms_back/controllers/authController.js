const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id);
    
    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
      res.cookie('jwt', token, cookieOptions);


    user.password = undefined;
    return res.status(statusCode).json({
        status : "success",
        token,
        user
    });
}



exports.signUp = catchAsync(async (req,res,next) => {

    const {first_name,last_name,email,password,passwordConfirm,direction_departments} = req.body;

    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        passwordConfirm,
        direction_departments
    });

    return res.status(200).json({
        status : "success",
        // token,
        user
    });
});
 




exports.login = catchAsync(async (req,res,next) => {

    const {email,password} = req.body;

    // ======================================================================================
    if(!email || !password){
        return next(new AppError("Please provide Email and Password !!",400));
    }
    // ======================================================================================


        //  Check if user exists && pass is correct 
    const user = await User.findOne({email}).select("+password")

    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError("Email ou mot de passe incorrect",401));
    }

    if(!user.active){
        return next(new AppError("Votre compte est désactivé",401));
    }
    // ======================================================================================

    // if everthing correct 
    createSendToken(user,201,res);

});


exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 500),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
  };


exports.protect = catchAsync(async (req,res,next) => {

        // 1. getting token and check if it's there
        let token = null;

        if(req.headers.cookie){
            token = req.headers.cookie.split("=")[1];
        }

        // ===============================================================================================================
        if(!token){
            return next(new AppError("Your are not logged in! Please log in to get access !!"),401)
        }
        // ===============================================================================================================
        
        // 2) Verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

          // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
            );
        }

        req.user = currentUser;

    next();
});


exports.checkUser = async  (req,res,next) => {

    let token = null;

    if(req.headers.cookie){
        token = req.headers.cookie.split("=")[1];
    }else{
        return res.status(200).json({
            status : "success",
            data :{
                user : null
            }
        })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

        return res.status(200).json({
            status : "success",
            data :{
                user : currentUser
            }
        })
}


exports.restrictTo = (...roles) => {
    
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError(`Vous n'êtes pas autorisé à effectuer cette action`, 403)
        );
      }
      next();
    };
  };