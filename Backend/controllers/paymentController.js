import { payment } from '../models/payment.js';
import mongoose from 'mongoose';
import { createNotification } from '../controllers/notificationController.js';
export const processPayment = async (req, res) => {
    try {
        const newPayment = await payment.create(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getPayments = async (req, res) => {
    try {
        const dbName = 'moveasy'; 
        const collectionName = 'payments'; 

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        const payments = await payment.find();
        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found.' });
        }
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: error.message });
    }
}



export const getPaymentById = async (req, res) => {
    try {
        const paymentdata = await payment.find({ orderId:req.params.orderId });
        console.log(req.params.orderId);
        if (!paymentdata) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(paymentdata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePayment = async (req, res) => {
    try {
        const deletedPayment = await payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
