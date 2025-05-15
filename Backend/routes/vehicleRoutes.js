import express from 'express';
import { getAllVehicles, updateVehiclePricing } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/vehicles', getAllVehicles);
router.put('/vehicles/pricing', updateVehiclePricing);


export default router;