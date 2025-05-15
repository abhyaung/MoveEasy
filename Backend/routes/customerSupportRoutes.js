import express from 'express';
import { createCustomerSupportTicket, getCustomerSupportTickets, getCustomerSupportTicketById, updateCustomerSupportTicket, deleteCustomerSupportTicket } from '../controllers/customerSupportController.js';

const router = express.Router();

// Route for creating a new customer support ticket
router.post('/customersupports', createCustomerSupportTicket);

// Route for getting all customer support tickets
router.get('/customersupports', getCustomerSupportTickets);

// Route for getting a customer support ticket by ID
router.get('/customersupports/:id', getCustomerSupportTicketById);

// Route for updating a customer support ticket
router.put('/customersupports/:id', updateCustomerSupportTicket);

// Route for deleting a customer support ticket
router.delete('/customersupports/:id', deleteCustomerSupportTicket);

export default router;
