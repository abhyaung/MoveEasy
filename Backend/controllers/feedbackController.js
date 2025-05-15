// Import the Feedback model
import { Feedback } from '../models/feedback.js';
import mongoose from 'mongoose';

// Function to create a ticket
export const createTicket = async (req, res) => {
    try {
        const newTicket = new Feedback({
            type: 'ticket',
            content: req.body.content,
            email: req.body.email  // Assuming email is sent as part of the request body
        });
        await newTicket.save();
        res.status(201).json({ message: 'Ticket submitted successfully', ticket: newTicket });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting ticket', error: error.message });
    }
};

// Function to create feedback
export const createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback({
            type: 'feedback',
            content: req.body.content,
            email: req.body.email  // Assuming email is sent as part of the request body
        });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (error) {
        res.status(400).json({ message: 'Error submitting feedback', error: error.message });
    }
};

// Function to get all tickets
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Feedback.find({ type: 'ticket' });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

// Function to get all feedbacks
export const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ type: 'feedback' });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
    }
};
