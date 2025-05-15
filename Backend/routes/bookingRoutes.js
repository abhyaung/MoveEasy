import express from 'express';
import { getBookingByBookingId, getCompletedBooking,createBooking, getBookings, getBookingById, updateBooking, deleteBooking, getBookingsByCustomerEmail,approveBooking,getPendingBooking,getApprovedBooking,getRejectedBooking, completeBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Route for creating a new booking
router.post('/bookings', createBooking);

// Route for getting all bookings
router.get('/bookings', getBookings);

// Route for getting a booking by ID
// router.get('/bookings/:id', getBookingById);

// Route for updating a booking
router.put('/bookings/:id', updateBooking);

// Route for deleting a booking
router.delete('/bookings/:id', deleteBooking);

router.get('/bookings/customers/:customerEmail', getBookingsByCustomerEmail);
router.post('/approve-booking', approveBooking);
router.post('/complete-booking', completeBooking);
router.get('/pending-booking', getPendingBooking);

// Route for getting approved bookings
router.get('/approved-booking', getApprovedBooking);

// Route for getting rejected bookings
router.get('/rejected-booking', getRejectedBooking);
router.get('/completed-booking', getCompletedBooking);
router.get('/bookings/book/:bookingId', getBookingByBookingId);


export default router;
