// models/Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['ticket', 'feedback'] // Ensures data integrity.
    },
    content: {
        type: String,
        required: true
    },
    email: { // New field to store the email of the user submitting the feedback or ticket
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export const Feedback = mongoose.model('feedback', feedbackSchema);
