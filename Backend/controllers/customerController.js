import { Customer } from '../models/Customer.js';
import mongoose from 'mongoose';

export const createCustomer = async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // If the error is due to a duplicate email, return a specific error message
            return res.status(400).send("Email address already exists.");
        }
        // For other errors, return a generic error message
        res.status(400).send(error.message);
    }
}

export const loginCustomer = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await Customer.findOne({ email });
        console.log('userLogin', user, req.body);
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare passwords        
        if (user.password !== password) {
            return res.status(401).send('Invalid email or password');
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

export const getCustomers = async (req, res) => {
    try {

        const dbName = 'moveasy';
        const collectionName = 'customers';

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);

        }

        const customers = await Customer.find();
        if (customers.length === 0) {

            return res.status(404).json({ message: 'No customers found.' });
        }
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: error.message });
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

