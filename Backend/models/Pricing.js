import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: String, required: true },
    mode: { type: String, required: true },
    vehicletype: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle' },
    ratePerMile: { type: Number, required: true },
    totalCost: { type: Number, required: true }
}, { timestamps: true });

export const Pricing = mongoose.model('Pricing', pricingSchema);
