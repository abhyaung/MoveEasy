import mongoose from  'mongoose';

const serviceSchema = new mongoose.Schema({
    serviceid: { 
        type: String,
        required: true,
        unique: true,
    },
    vehicletype: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"delivery",
        
    },

},  { timestamps: true });
export  const service = mongoose.model("service", serviceSchema)