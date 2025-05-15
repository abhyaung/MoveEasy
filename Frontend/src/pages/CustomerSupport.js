import React, { useState } from 'react';
import '../CustomerSupport.css';

function CustomerSupport() {
  const [showAnswers, setShowAnswers] = useState({});

  // Function to toggle answer visibility
  const toggleAnswer = (question) => {
    setShowAnswers(prevState => ({
      ...prevState,
      [question]: !prevState[question]
    }));
  };

  return (
    <div className="customerbase">
      <div className="cs-first">
        <h1>
        Customer Support
        </h1>
      </div>
      <div className="customer-support">
        <div className="customerheader">
          <p>Welcome to our customer support page. We're here to assist you.</p>
        </div>
        
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>If you have any questions or concerns, feel free to reach out to us:</p>
          <ul>
            <li>Email: support@moveasy.com</li>
            <li>Phone: +1-123-456-7890</li>
          </ul>
        </div>
        
        <div className="faq">
  <h2>Frequently Asked Questions</h2>
  <p>Check out our FAQs to find answers to common queries:</p>
  <ul>
    <li onClick={() => toggleAnswer('booking')}>
      How can I book your services?
      {showAnswers['booking'] && (
        <p className="answer">You can book our services by visiting our website or contacting our support team.</p>
      )}
    </li>
    <li onClick={() => toggleAnswer('pricing')}>
      What are your pricing plans?
      {showAnswers['pricing'] && (
        <p className="answer">Our pricing plans vary depending on the type and duration of the service. Please visit our pricing page for more details.</p>
      )}
    </li>
    <li onClick={() => toggleAnswer('packingMaterials')}>
      Do you provide packing materials?
      {showAnswers['packingMaterials'] && (
        <p className="answer">Yes, we provide packing materials as part of our service package. You can also purchase additional packing materials if needed.</p>
      )}
    </li>
    
  </ul>
</div>

      </div>
    </div>
  );
}

export default CustomerSupport;
