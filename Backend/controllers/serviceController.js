import { service } from '../models/Service.js';
import mongoose from 'mongoose';

export const createService = async (req, res) => {
    try {
        const newService = await service.create(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getServices = async (req, res) => {
    try {
        const dbName = 'moveasy'; 
        const collectionName = 'services'; 

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        const services = await service.find();
        if (services.length === 0) {
            return res.status(404).json({ message: 'No services found.' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: error.message });
    }
}

export const getServiceById = async (req, res) => {
    try {
        const service = await service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateService = async (req, res) => {
    try {
        const updatedService = await service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteService = async (req, res) => {
    try {
        const deletedService = await service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
