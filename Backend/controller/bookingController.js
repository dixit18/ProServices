const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");

const createBooking = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
    sellerId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    payment: "temp",
  });

  await newBooking.save();

  res.status(200).json({
    msg: "successfull",
  });
});

const getBooking = catchAsync(async (req, res, next) => {
    const booking = await BookingModel.find({
        ...(req.isServiceProvider?{sellerId:req.user._id}:{buyerId:req.user._id}),
        isCompleted:true

    })
    res.status(200).json({
        booking
    })
})


module.exports = {
  createBooking,
  getBooking
};
