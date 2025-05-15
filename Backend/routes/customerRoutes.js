import express from 'express';
import { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer, loginCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/customers', createCustomer);

router.post('/loginCustomer', loginCustomer);

router.get('/customers', getCustomers);


router.get('/customers/:id', getCustomerById);

router.put('/customers/:id', updateCustomer);

router.delete('/customers/:id', deleteCustomer);




export default router;
