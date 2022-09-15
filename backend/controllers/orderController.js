const Order = require('../models/orderModels');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

//getorderDetails
exports.getOrderDetails = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with order id: ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({
      success: true,
      order,
    });
  }
};

//get logged in user order Details
exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler(`You have no orders till date`, 404));
  } else {
    res.status(200).json({
      success: true,
      orders,
    });
  }
};
