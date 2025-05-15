import mongoose from  'mongoose';

const customerSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname:{
        type:String,
        required:true,
    },
    Addressline: {
        type: String,
        maxlength: 255,
    },

    email: {
        type: String,
        required: true,
        
    },

    password: {     
        type: String,
        required: [true,"Password is required"],
    },
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"service",
    },



},  { timestamps: true });
export const Customer = mongoose.model("customers", customerSchema);



