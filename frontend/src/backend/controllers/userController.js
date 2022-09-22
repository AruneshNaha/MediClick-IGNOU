const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModels');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js');
const validator = require('validator');
const crypto = require('crypto');

//Register a user
exports.registerUser = async (req, res, next) => {

  if(!req.body.email || !req.body.name || !req.body.password || !validator.isEmail(req.body.email)){
    return next(new ErrorHandler('Please enter all fields correctly', 400))
  }
  
  else{
    User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return next(new ErrorHandler('Email is already registered in our website', 400))
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        newUser.save();

        sendToken(newUser, 200, res);
      }
    })
    .catch((err) =>
      {return next(new ErrorHandler(err, 500))}
    );
  }
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
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    sendToken(user, 200, res);
  } else {
    return next(new ErrorHandler('Invalid email or password', 401));
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

//Get User details
exports.getUserDetails = async (req, res, next) => {
  await User.findById(req.user.id)
    .then((user) => {
      res.status(200).json({
        success: true,
        user,
      });
    })
    .catch((err) =>
      res.status(401).json({
        success: false,
        message: err,
        tip: 'May be you need to login first!',
      })
    );
};

//Update User passowrd
exports.updateUserPassword = async (req, res, next) => {
  await User.findById(req.user.id, req.body.oldPassword)
    .select('+password')
    .then(async (user) => {
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (isPasswordMatched) {
        const encryptPassword = await user.encryptPassword(
          req.body.newPassword
        );

        User.findByIdAndUpdate(
          req.user.id,
          { password: encryptPassword },
          { new: true, runValidators: true, useFindAndModify: false }
        )
          .then(() =>
            res.status(200).json({
              sucess: true,
              message: 'Password updated succesfully',
            })
          )
          .catch((err) => {
            next(new ErrorHandler(err, 500));
          });
      }
    })
    .catch((err) =>
      res.status(401).json({
        success: false,
        message: err,
        tip: 'May be you need to login first!',
      })
    );
};

//Update User profile
exports.updateUserDetails = async (req, res, next) => {
  await User.findById(req.user.id)
    .then(async () => {
      //First check if user tries to update the email
      if (req.body.email) {
        //Check if user with same email already exists
        await User.findOne({ email: req.body.email }).then(async (user) => {
          //In case same email user does'nt exist
          if (!user) {
            await User.findByIdAndUpdate(req.user.id, req.body, {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            })
              .then(() =>
                res.status(200).json({
                  success: true,
                  message: 'Details updated successfully',
                })
              )
              .catch((err) => {
                next(new ErrorHandler(err, 500));
              });
          } else {
            res.status(500).json({
              success: false,
              message: 'This email already exists in our database',
            });
          }
        });

        //Condition in case an user with the same email is not found, then user details are updated succesfully
      } else {
        await User.findByIdAndUpdate(req.user.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        })
          .then(() =>
            res.status(200).json({
              success: true,
              message: 'Details updated successfully',
            })
          )
          .catch((err) => {
            next(new ErrorHandler(err, 500));
          });
      }
    })
    .catch((err) => next(new ErrorHandler(err, 500)));
};

//Admin route
exports.getAllUsers = async (req, res, next) => {
  await User.find()
    .then((users) =>
      res.status(200).json({
        success: true,
        users,
      })
    )
    .catch((err) => next(new ErrorHandler(err, 500)));
};

//Admin route
exports.getUserById = async (req, res, next) => {
  await User.findById(req.params.id)
    .then((users) =>
      res.status(200).json({
        success: true,
        users,
      })
    )
    .catch((err) => next(new ErrorHandler(err, 500)));
};

//Update User role (Admin route)
exports.updateUserRole = async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { role: 'admin' })
    .then(() =>
      res
        .status(200)
        .json({ success: true, message: 'Role updated succesfully' })
    )
    .catch((err) => next(new ErrorHandler(err, 500)));
};

//Delete User (Admin route)
exports.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() =>
      res.status(200).json({
        success: true,
        message: `User id: ${req.params.id} has been deleted`,
      })
    )
    .catch((err) => next(new ErrorHandler(err, 500)));
};
