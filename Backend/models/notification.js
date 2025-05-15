import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  recipientType: { type: String, enum: ['Customer', 'DeliveryPartner', 'Admin'], required: true },
  recipientEmail: { type: String, required: true, ref: 'customers' },  // Manually use the `email` to link to Customer
  status: { type: String, enum: ['Sent', 'Pending', 'Read'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  // Bookingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
});

export const Notification = mongoose.model('Notification', notificationSchema);

