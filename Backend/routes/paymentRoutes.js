import express from 'express';
import { processPayment, getPayments, getPaymentById, updatePayment, deletePayment } from '../controllers/paymentController.js';

const router = express.Router();

// Route for processing a payment
router.post('/payments', processPayment);

// Route for getting all payments
router.get('/payments', getPayments);

// Route for getting a payment by ID
router.get('/payments/:orderId', getPaymentById);

// Route for updating a payment
router.put('/payments/:id', updatePayment);

// Route for deleting a payment
router.delete('/payments/:id', deletePayment);

export default router;
