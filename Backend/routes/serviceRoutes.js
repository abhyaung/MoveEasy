import express from 'express';
import { createService, getServices, getServiceById, updateService, deleteService } from '../controllers/serviceController.js';

const router = express.Router();

// Route for creating a new service
router.post('/services', createService);

// Route for getting all services
router.get('/services', getServices);

// Route for getting a service by ID
router.get('/services/:id', getServiceById);

// Route for updating a service
router.put('/services/:id', updateService);

// Route for deleting a service
router.delete('/services/:id', deleteService);

export default router;
