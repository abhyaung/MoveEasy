// routes/userResponses.js
import express from 'express';
import { createTicket, createFeedback,getAllTickets,  getAllFeedbacks } from '../controllers/feedbackController.js';

const router = express.Router();

// Routes for submitting tickets and feedback
router.post('/tickets', createTicket);
router.post('/feedbacks', createFeedback);

router.get('/tickets', getAllTickets);
router.get('/feedbacks', getAllFeedbacks);


export default router;
