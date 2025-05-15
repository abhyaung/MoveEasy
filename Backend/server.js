import express from 'express';
import cors from 'cors'
//import mongoose from 'mongoose';
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import customerRoutes from './routes/customerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import customerSupportRoutes from './routes/customerSupportRoutes.js';
import deliveryPartnerRoutes from './routes/deliveryPartnerRoutes.js';

import paymentRoutes from './routes/paymentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import adminUserRoutes from './routes/adminUserRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config({
  path:'./env'
});

const app = express();
app.use(cors());
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection fail", error);
  });


// // Middleware
app.use(express.json());

app.use(bodyParser.json());

// Routes
app.use(customerRoutes);
app.use(bookingRoutes);
app.use(customerSupportRoutes);
app.use(deliveryPartnerRoutes);

app.use(paymentRoutes);
app.use(serviceRoutes);
app.use(pricingRoutes);
app.use(adminUserRoutes);
app.use(vehicleRoutes);

app.use(feedbackRoutes);
app.use(notificationRoutes)
