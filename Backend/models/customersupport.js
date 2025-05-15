import mongoose from  'mongoose';

const customersupportSchema = new mongoose.Schema({
    ticketid: {
      type: Number,
      unique : true ,
      required: true,
    },

    // paymentid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"payment",
    // }, 
    // customeremail: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"customer",
    // },
    // deliveryemail: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"delivery",
    // }, 
    remarks:{
        type: String,
        required: true,
    },
    actiontaken: {
        type: Boolean,
        required:  true,
    },

},  { timestamps: true });
export  const customersupport = mongoose.model("customersupport", customersupportSchema)