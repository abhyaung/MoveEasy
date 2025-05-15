import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    vehicletype: {
        type: String,
        enum: ['car', 'moped', 'cycle', 'Truck', 'cybertruck'],
        unique: true,
    },
    pricing: {
        type: Number, // Remember to capitalize Number
        required: true,
        null: false,
    },
});

export const Vehicle = mongoose.model("vehicle", vehicleSchema);
