import { Booking } from '../models/Booking.js';
import { Pricing } from '../models/Pricing.js';
import { Vehicle } from '../models/vehicle.js';
// import { createNotification } from '../controllers/notificationController';
import axios from 'axios';
import mongoose from 'mongoose';

// Ensure your API key is securely stored and accessed
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Function to calculate and store distance, returning the pricing document's ID
const calculateAndStoreDistance = async (origin, destination, vehicleType, mode = 'DRIVING') => {
    const formattedOrigin = `${origin.Addressline1}, ${origin.Addressline2}, ${origin.city}, ${origin.Zip}`;
    const formattedDestination = `${destination.DropAddressline1}, ${destination.DropAddressline2}, ${destination.Dropcity}, ${destination.DropZip}`;

    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
            origins: formattedOrigin,
            destinations: formattedDestination,
            mode: mode,
            key: googleMapsApiKey, // Make sure the API key is securely stored and accessed
        }
    });

    if (response.data.status === "OK" && response.data.rows[0].elements[0].status === 'OK') {
        const distanceData = response.data.rows[0].elements[0];
        const distanceInMiles = Math.round(distanceData.distance.value / 1609.34); // Convert meters to miles without appending any text

        // Fetch the pricing information from the Vehicle model
        console.log(vehicleType);
        const vehicleData = await Vehicle.findOne({ vehicletype: vehicleType });
        console.log("misha", vehicleData);
        if (!vehicleData) {
            throw new Error('Vehicle type not found');
        }


        const pricing = new Pricing({
            origin: formattedOrigin,
            destination: formattedDestination,
            distance: distanceInMiles, // Save as a numerical value
            duration: distanceData.duration.text,
            mode,
            vehicleType,
            ratePerMile: vehicleData.pricing, // Get the pricing from the Vehicle model
            totalCost: distanceInMiles * vehicleData.pricing, // Calculate the total cost
        });

        await pricing.save();
        return pricing._id;
    } else {
        throw new Error('Failed to calculate distance or distance API error');
    }
};

// Function to create a booking
export const createBooking = async (req, res) => {
    try {
        // Extracting data from request
        const { Addressline1, Addressline2, city, Zip, DropAddressline1, DropAddressline2, Dropcity, DropZip, mode, vehicleType, status } = req.body;

        // Check for existing bookings that might cause conflicts
        // const existingBooking = await Booking.findOne({ $or: [{ email: req.body.email }, { phoneno: req.body.phoneno }, { Receiverphoneno: req.body.Receiverphoneno }] });
        // if (existingBooking) {
        //     return res.status(409).json({ message: "Booking with provided contact information already exists." });
        // }

        // Calculate distance and store pricing details, getting back the ID of the pricing document
        console.log(vehicleType, 68);
        const pricingId = await calculateAndStoreDistance({ Addressline1, Addressline2, city, Zip }, { DropAddressline1, DropAddressline2, Dropcity, DropZip }, vehicleType, mode);

        const pricingData = await Pricing.findById(pricingId);
        if (!pricingData) {
            throw new Error('Pricing document not found');
        }

        // Create a new booking with the associated pricing document
        const bookingData = {
            ...req.body,
            pricing: pricingId,
            totalCost: pricingData.totalCost // Add the totalCost from pricingData
        };
        const newBooking = await Booking.create(bookingData);

        // Respond with success and the booking details, including totalCost
        res.status(201).json({
            message: 'Booking created successfully!',
            booking: newBooking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(400).json({ message: error.toString() });
    }
};
export const getBookings = async (req, res) => {
    try {
        const dbName = 'moveasy';
        const collectionName = 'bookings';

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        const bookings = await Booking.find();
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found.' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: error.message });
    }
}

export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookingsByCustomerEmail = async (req, res) => {
    try {
        const customerEmail = req.params.customerEmail;
        const bookings = await Booking.find({ email: customerEmail });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const approveBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: 'Approved' }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error approving booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const completeBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: 'Completed' }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error approving booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const rejectedBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { status: 'Rejected' }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error Rejecting booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPendingBooking = async (req, res) => {
    try{
        const pendingBookings = await Booking.find({ status: 'Pending' });
        res.status(200).json(pendingBookings);
    }
    catch{
        console.error('Error getPendingBooking booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getApprovedBooking = async (req, res) => {
    try {
        const dbName = 'moveasy';
        const collectionName = 'bookings';

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        // Assuming 'status' is the field representing the status of each booking
        const pendingBookings = await Booking.find({ status: 'Approved' });

        if (pendingBookings.length === 0) {
            return res.status(404).json([]);
        }

        res.status(200).json(pendingBookings);
    } catch (error) {
        console.error('Error fetching pending bookings:', error);
        res.status(500).json({ message: error.message });
    }
}

export const getRejectedBooking = async (req, res) => {
    try {
        const dbName = 'moveasy';
        const collectionName = 'bookings';

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(c => c.name === collectionName);

        if (!collectionExists) {
            console.log(`Collection ${collectionName} does not exist in ${dbName}.`);
            return res.status(404).json({ message: `Collection ${collectionName} does not exist in ${dbName}.` });
        }

        // Assuming 'status' is the field representing the status of each booking
        const pendingBookings = await Booking.find({ status: 'Rejected' });

        if (pendingBookings.length === 0) {
            return res.status(404).json([]);
        }

        res.status(200).json(pendingBookings);
    } catch (error) {
        console.error('Error fetching pending bookings:', error);
        res.status(500).json({ message: error.message });
    }
}
export const getCompletedBooking = async (req, res) => {
    try {
     

        // Assuming 'status' is the field representing the status of each booking
        const pendingBookings = await Booking.find({ status: 'Completed' });

        if (pendingBookings.length === 0) {
            return res.status(404).json([]);
        }

        res.status(200).json(pendingBookings);
    } catch (error) {
        console.error('Error fetching pending bookings:', error);
        res.status(500).json({ message: error.message });
    }
}
export const getBookingByBookingId = async (req, res) => {
    try {
              
        const booking = await Booking.find({ Bookingid: req.params.bookingId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        // Adjusted error handling to reflect the nature of the identifier
        res.status(500).json({ message: 'Internal server error' });
    }
};


