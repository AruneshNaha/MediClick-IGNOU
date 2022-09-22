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

//getAllOrders -- Admin
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(new ErrorHandler(`You have no orders till date`, 404));
  } else {
    res.status(200).json({
      success: true,
      orders,
      totalAmount,
    });
  }
};

//update order status --Admin
exports.updateOrderStatus = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`You have no orders till date`, 404));
  } else {
    if (order.orderStatus === 'Delivered') {
      return next(
        new ErrorHandler('You have already delivered this order', 400)
      );
    }

    order.orderItems.forEach(async (order) => {
      await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });
  }
};

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

//delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`You have no orders till date`, 404));
  } else {
    await order.remove();

    res.status(200).json({
      success: true,
      message: 'Order removed',
    });
  }
};
