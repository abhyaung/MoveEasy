import { AdminUser } from '../models/AdminUser.js';
import mongoose from 'mongoose';

export const createAdmin = async (req, res) => {
    try {
        const existingBookingEmail = await AdminUser.findOne({ email: req.body.email });
        if (existingBookingEmail) {
            // If the email already exists, return an error
            return res.status(400).send("Email address already exists.");
        }
        const newBooking = await AdminUser.create(req.body);
        console.log('requestd', newBooking);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const LoginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await AdminUser.findOne({ email });
        console.log('userLogin', user, req.body);
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare passwords        
        if (user.password !== password) {
            return res.status(401).send('Invalid email or password');
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}
