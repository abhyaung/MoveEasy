// Chatbot.js
import React, { useState } from 'react';
import '../Chatbot.css'; // Ensure you import the CSS correctly
import TicketForm from './TicketForm';
// import EscalationForm from './EscalationForm';
import FeedbackForm from './FeedbackForm';

function Chatbot({ closeChatbot }) {
  const [activeForm, setActiveForm] = useState('');

  const handleFormComplete = () => {
    setActiveForm('');
    // Additional tasks post form completion
  };

  return (
    <div className="chatbot-container">
      <h2>MoveMate</h2>
      <button onClick={closeChatbot} className="close-btn">X</button>
      {!activeForm && (
        <div>
          <button onClick={() => setActiveForm('ticket')}>Create Ticket</button>
          {/* <button onClick={() => setActiveForm('escalate')}>Escalate Issue</button> */}
          <button onClick={() => setActiveForm('feedback')}>Feedback</button>
        </div>
      )}
      {activeForm === 'ticket' && <TicketForm onComplete={handleFormComplete} />}
      {/* {activeForm === 'escalate' && <EscalationForm onComplete={handleFormComplete} />} */}
      {activeForm === 'feedback' && <FeedbackForm onComplete={handleFormComplete} />}
    </div>
  );
}

export default Chatbot;
