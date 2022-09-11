const Product = require('../models/productModel');
const Apifeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

//Create product
exports.createProduct = async (req, res) => {
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
  const resultPerPage = 5;
  const productCount = await Product.countDocuments()
  const apiFeature = new Apifeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount
  });
};
