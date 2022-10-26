const Product = require('../models/productModel');
const Apifeatures = require('../utils/apiFeatures');
const _ = require('lodash');
const { sortedIndexBy, sortBy } = require('lodash');

const ErrorHandler = require('../utils/errorHandler');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = path.extname(file.originalname);
    cb(null, req.body.id + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
}).single('images');

exports.uploadProductImage = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    } else {
      res.status(200).json({
        message: 'Image Succesfully uploaded!',
        filename: `uploads/${req.file.filename}`,
      });
    }
  });
};

//Create product
exports.createProduct = async (req, res) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//Update product
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 500));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
    .then((product) => {
      res.status(200).json({
        success: true,
        product,
      });
    })
    .catch((err) => console.log(err));
};

//Delete a product
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 500));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
};

//Get single product
exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  // const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  // const apiFeature = new Apifeatures(Product.find(), req.query)
  //   .search()
  //   .filter()
  //   .pagination(resultPerPage);

  const products = await Product.find().sort({'name': 1});
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
};

//Managing product reviews
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.ratings = product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

//Get all reviews
exports.getAllReviews = async (req, res, next) => {
  // const product =
  await Product.findById(req.query.id)
    .then((product) => res.status(200).json(product.reviews))
    .catch((err) =>
      res.status(404).json({ error: true, message: 'Product not found' })
    );
};

//Delete Review (Admin)
exports.deleteReview = async (req, res, next) => {
  await Product.findById(req.query.productId)
    .then(async (product) => {
      const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
      );

      let avg = 0;

      reviews.forEach((rev) => {
        avg += rev.rating;
      });

      const ratings = avg / reviews.length;

      const numOfReviews = reviews.length;

      await Product.findByIdAndUpdate(
        req.query.productId,
        { reviews: reviews, ratings: ratings, numOfReviews: numOfReviews },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      ).then(() =>
        res.status(200).json({ message: 'Review has been removed' })
      );
    })
    .catch((err) =>
      res.status(404).json({ error: true, message: 'Product not found' })
    );
};
