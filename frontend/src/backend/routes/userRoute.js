const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router
  .route('/updateUserPassword')
  .put(isAuthenticatedUser, updateUserPassword);
router.route('/updateUserDetails').put(isAuthenticatedUser, updateUserDetails);
router
  .route('/getAllUsers')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router
  .route('/getUserById/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserById);
router
  .route('/updateUserRole/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);
router
  .route('/deleteUser/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
