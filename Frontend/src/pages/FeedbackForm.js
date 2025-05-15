import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/feedbacks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: feedback, type: 'feedback', email })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Feedback submitted successfully!');
            setFeedback('');
            setEmail('');  // Reset the email field
        } else {
            alert('Failed to submit feedback: ' + data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <div>Your Feedback:</div>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
                </label>
                <label>
                    <div>Email:</div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
