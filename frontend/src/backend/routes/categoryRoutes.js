const express = require('express');
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

//params
router.param('categoryId', getCategoryById);

//actual routes goes here

//create routes
router.post(
  '/category/create',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  createCategory
);

//read routes
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

//update
router.put(
  '/category/:categoryId',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateCategory
);

//delete
router.delete(
  '/category/:categoryId',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteCategory
);

module.exports = router;
