import mongoose from  'mongoose';

const deliverySchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    phoneno: {
        type:Number,
        required: [true,"Phone number is required"],
        unique : true,
    },
    password: {     
        type: String,
        required: [true,"Password is required"],
    },
    licenseno: {
        type: String,
        required: true,
        unique : true,
    },
    vehicleno: {
        type: String,
        required: true,
        unique : true,
    },
    vehicletype: {
        type: String,
        enum: ['car', 'moped', 'cycle', 'Truck', 'cybertruck'], 
    },

    paymentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"payment",
    },

},  { timestamps: true });
export  const delivery = mongoose.model("delivery", deliverySchema)
