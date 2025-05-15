import { Vehicle } from '../models/vehicle.js';
import mongoose from 'mongoose';

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateVehiclePricing = async (req, res) => {
  const { vehicletype, pricing } = req.body;

  try {
    const vehicle = await Vehicle.findOneAndUpdate(
      { vehicletype: vehicletype },
      { pricing: pricing },
      { new: true } // Uncomment this line
    );

    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};