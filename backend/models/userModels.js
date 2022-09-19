const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should have minimum of 8 characters'],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: {type: String, default: undefined},
  resetPasswordExpire: {type: Date, default: undefined},
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.encryptPassword = async(password) => {
  return await bcrypt.hash(password, 10);
}

//JWT Token
userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Forgot password
userSchema.methods.getResetPasswordToken = () => {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString('hex');
  // console.log(`ResetToken: ${resetToken}`)

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
