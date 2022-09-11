const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModels');
const sendToken = require('../utils/jwtToken');

//Register a user
exports.registerUser = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ emailError: 'Email is already registered in our website' });
      }else{
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
  
          sendToken(newUser, 201, res)
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
//   console.log(isPasswordMatched)

  if (await isPasswordMatched) {
    sendToken(user,200, res)
  }else{
    return new ErrorHandler('Invalid email or password', 401);
  }

};
