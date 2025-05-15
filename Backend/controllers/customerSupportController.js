import { customersupport } from '../models/CustomerSupport.js';
import mongoose from 'mongoose';

export const createCustomerSupportTicket = async (req, res) => {
    try {
        const newTicket = await customersupport.create(req.body);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getCustomerSupportTickets = async (req, res) => {
    try {
        const dbName = 'moveasy'; 
        const collectionName = 'customersupports'; 

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        const tickets = await customersupport.find();
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found.' });
        }
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching customer support tickets:', error);
        res.status(500).json({ message: error.message });
    }
}

export const getCustomerSupportTicketById = async (req, res) => {
    try {
        const ticket = await customersupport.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCustomerSupportTicket = async (req, res) => {
    try {
        const updatedTicket = await customersupport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCustomerSupportTicket = async (req, res) => {
    try {
        const deletedTicket = await customersupport.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
