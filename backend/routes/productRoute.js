const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
  uploadProductImage,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router
  .route('/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router
  .route('/upload')
  .post(isAuthenticatedUser, authorizeRoles('admin'), uploadProductImage);
router
  .route('/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)
  .get(getProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router
  .route('/reviews')
  .get(isAuthenticatedUser, getAllReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
