// EscalationForm.js
import React from 'react';
import '../FormStyles.css';

function EscalationForm({ onComplete }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Issue escalated successfully!');
    onComplete();
  };

  return (
    <form className="escalation-form" onSubmit={handleSubmit}>
      <label>
        Ticket ID:
        <input type="text" name="ticketId" required />
      </label>
      <label>
        Reason for Escalation:
        <textarea name="reason" required />
      </label>
      <button type="submit">Escalate Issue</button>
    </form>
  );
}

export default EscalationForm;