const User = require("../models/userModel");
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const sendCookie = require('../utils/sendCookie');



// /api/v1/user/signup
//public
//sign up
const signupUser = catchAsync(async (req, res, next) => {
  const { name, email, password, isServiceProvider } = req.body;



  const newUser = await User.create({
    name,
    email,
    password,
    isServiceProvider,
    // avatar:req.file.filename
  });

//   createSendToken(newUser, 201, res)
sendCookie(newUser, 201, res);

});

// /api/v1/user/login
//public
//Login

const loginUser = catchAsync(async (req,res,next)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email}).select('+password')


    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }
    sendCookie(user, 201, res);
    // createSendToken(user, 200, res);
})


// /api/v1/user/logout
//public
//logout
const logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser
};
