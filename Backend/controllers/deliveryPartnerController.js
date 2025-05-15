import { delivery } from '../models/DeliveryPartner.js';
import mongoose from 'mongoose';

export const createDeliveryPartner = async (req, res) => {
    try {
        const newDeliveryPartner = await delivery.create(req.body);
        res.status(201).json(newDeliveryPartner);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // If the error is due to a duplicate email, return a specific error message
            return res.status(400).send("Email address already exists.");
        }
        // For other errors, return a generic error message
        res.status(400).send(error.message);
    }
}

export const loginDeliveryPartner = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await delivery.findOne({ email });
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

export const getDeliveryPartners = async (req, res) => {
    try {
        const dbName = 'moveasy';
        const collectionName = 'deliveries';

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        const deliveryPartners = await delivery.find();
        if (deliveryPartners.length === 0) {
            return res.status(404).json({ message: 'No delivery partners found.' });
        }
        res.status(200).json(deliveryPartners);
    } catch (error) {
        console.error('Error fetching delivery partners:', error);
        res.status(500).json({ message: error.message });
    }
}

export const getDeliveryPartnerById = async (req, res) => {
    try {
        const deliveryPartner = await delivery.findById(req.params.id);
        if (!deliveryPartner) {
            return res.status(404).json({ message: 'Delivery partner not found' });
        }
        res.status(200).json(deliveryPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDeliveryPartner = async (req, res) => {
    try {
        const updatedDeliveryPartner = await delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDeliveryPartner) {
            return res.status(404).json({ message: 'Delivery partner not found' });
        }
        res.status(200).json(updatedDeliveryPartner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteDeliveryPartner = async (req, res) => {
    try {
        const deletedDeliveryPartner = await delivery.findByIdAndDelete(req.params.id);
        if (!deletedDeliveryPartner) {
            return res.status(404).json({ message: 'Delivery partner not found' });
        }
        res.status(200).json({ message: 'Delivery partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getDeliveryPartnerByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const deliveryPartner = await delivery.findOne({ email: email });
        if (!deliveryPartner) {
            return res.status(404).json({ message: 'Delivery partner not found' });
        }
        res.status(200).json(deliveryPartner);
    } catch (error) {
        console.error('Error fetching delivery partner by email:', error);
        res.status(500).json({ message: error.message });
    }
};