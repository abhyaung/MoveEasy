import React, { useState } from 'react';

function TicketForm() {
    const [issue, setIssue] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: issue, type: 'ticket', email })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Ticket submitted successfully!');
            setIssue('');
            setEmail('');  // Reset the email field
        } else {
            alert('Failed to submit ticket: ' + data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Issue:
                    <input type="text" value={issue} onChange={(e) => setIssue(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit">Submit Ticket</button>
            </form>
        </div>
    );
}

export default TicketForm;
