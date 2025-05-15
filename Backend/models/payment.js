import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    totalCost: {
      type: Number,
      
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    cardNumber: {
      type: String,
      required: true,
      trim: true
    },
    expiryDate: {
      type: String,
      required: true,
      trim: true
    },
    cvv: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    orderId: {
      type: String,
      required: true,
  },
  Bookingid: {
      type: Number,
      ref: "Booking",
  }
  }, { timestamps: true });
  export const payment = mongoose.model('payment', paymentSchema)