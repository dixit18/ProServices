import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paid: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookingSchema);
