const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const BookingModel = require("../models/bookingModel");
const ServiceModel = require("../models/serviceModel");
const Stripe = require("stripe")
const createBooking = catchAsync(async (req, res, next) => {
  const service = await ServiceModel.findById(req.params.id);

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
    sellerId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    payment: paymentIntent.id,
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

const createPaymentIntent = async(req,res,next)=>{
const stripe = new Stripe(process.env.STRIPE)
const service = await ServiceModel.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(service.price *100),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newBooking = new BookingModel({
    serviceId: service._id,
    img: service.img,
    title: service.title,
    sellerId: service.userId,
    buyerId: req.user._id,
    price: service.price,
    payment: paymentIntent.id,
  });

  await newBooking.save();
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}
const confirm = async(req,res,next)=>{
  console.log("req",req.body)
  const orders = await BookingModel.findOneAndUpdate(
    {
      payment: req.body.payment_intent,
    },
    {
      $set: {
        isCompleted: true,
      },
    }, {
      new: true
    }
  );
console.log(orders);
  res.status(200).json("Order has been confirmed.");
}
module.exports = {
  createBooking,
  getBooking,createPaymentIntent,confirm
};
