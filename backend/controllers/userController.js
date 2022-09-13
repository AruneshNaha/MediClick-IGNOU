const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModels');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');

//Register a user
exports.registerUser = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ emailError: 'Email is already registered in our website' });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: {
            public_id: 'This is a sample id',
            url: 'profilepicurl',
          },
        });
        newUser.save();

        sendToken(newUser, 201, res);
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
};

////Login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //Checkign if email.and password is correct

  if (!email || !password) {
    return next(new ErrorHandler('Please Enter email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return new ErrorHandler('Invalid email or password', 401);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (await isPasswordMatched) {
    sendToken(user, 200, res);
  } else {
    return new ErrorHandler('Invalid email or password', 401);
  }
};

//logout user
exports.logout = async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    essage: 'Logged out',
  });
};

//Forgot password
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found!', 404));
  }

  //get reset password token
  const resetToken = await user.getResetPasswordToken();

  const passwordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  await user
    .updateOne({
      resetPasswordToken: passwordToken,
      resetPasswordExpire: Date.now() + 10 * 60 * 1000,
    })
    .catch((err) => res.status(500).json({ message: err }));

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset url is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.Please click on the link within 10 minutes after which it will expire`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Mediclick Password Recovery`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
};

//Reset password
exports.resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Reset Password Token is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not password', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};
