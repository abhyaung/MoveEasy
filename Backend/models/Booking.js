import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    vehicletype: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"vehicle",
    },
    Name: {
        type: String,
        required: true,
    },
    phoneno: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Addressline1: {
        type: String,
        required: true,
    },
    Addressline2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    Zip: {
        type: Number,
        required: true,
    },
    DropAddressline1: {
        type: String,
        required: true,
    },
    DropAddressline2: {
        type: String,
    },
    Dropcity: {
        type: String,
        required: true,
    },
    DropZip: {
        type: Number,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true
    },
    ReceiverName: {
        type: String,
        required: true,
    },
    Receiverphoneno: {
        type: Number,
        required: true,
    },
    serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
    },
    Bookingid: {
        type: Number,
        unique: true,
        
    },
    pricing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pricing",
    },
    totalCost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,        
        required: true,
    }
}, { timestamps: true });

bookingSchema.pre('save', async function (next) {
    try {
        if (!this.Bookingid) {
            const lastBooking = await this.constructor.findOne({}, {}, { sort: { 'Bookingid': -1 } });
            const lastBookingid = lastBooking ? lastBooking.Bookingid : 0;
            this.Bookingid = lastBookingid + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Booking = mongoose.model("booking", bookingSchema);
