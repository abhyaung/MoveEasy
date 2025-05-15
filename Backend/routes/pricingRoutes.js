import express from 'express';
import { createPricingData } from '../controllers/pricingController.js';

const router = express.Router();

router.post('/store-distance', createPricingData);

export default router;
