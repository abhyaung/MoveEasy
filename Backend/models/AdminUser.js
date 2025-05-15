import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }

}, { timestamps: true });
export const AdminUser = mongoose.model("admin", AdminUserSchema);



