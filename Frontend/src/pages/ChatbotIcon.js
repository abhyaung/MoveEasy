// ChatbotIcon.js
import React from 'react';
import '../ChatbotIcon.css'; // Assuming you have a CSS file for styling
import chatbot from '../assets/chatlogo.webp';

function ChatbotIcon({ onClick }) {
  return (
    <div className="chatbot-icon" onClick={onClick}>
      {/* You can use an SVG or an image for the chatbot icon */}
      <img src={chatbot} alt="Chat" />
    </div>
  );
}

export default ChatbotIcon;
