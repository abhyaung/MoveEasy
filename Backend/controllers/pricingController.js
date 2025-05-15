import { Pricing } from '../models/Pricing.js';
import mongoose from 'mongoose';


export const createPricingData = async (req, res) => {
  try {
    const newPricing = await Pricing.create(req.body);
    res.status(201).json(newPricing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
