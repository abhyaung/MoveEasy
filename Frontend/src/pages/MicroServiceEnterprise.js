import React from 'react';
import '../MicroServiceEnterprise.css'; // Updated CSS file for MicroServiceEnterprises theme
import '../MicroServiceOptions.css'; // Updated CSS file for options specific to MicroServiceEnterprises
import ServiceImageOne from '../assets/service1.webp'; // Placeholder image for microservice
import ServiceImageTwo from '../assets/service2.webp'; // Placeholder image for another microservice
import { Button, Modal } from 'react-bootstrap';
import Logo from '../assets/logo.jpg'; // Assuming the same logo is used
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function MicroServiceEnterprise() {
  const navigate = useNavigate();

  // Function to navigate to the booking page
  const navigateToBooking = () => {
    navigate('/quotation');
  };

  return (
    <>
      <div className="microservice-sub-header"></div>

      <div className="MicroServiceOptions-container">
        <h2 style={{ color: '#0D1B2A', fontSize: '85px' }}>Our Microservices</h2> {/* Updated heading */}
        <div className="options">
          <div className="option-card">
            <img src={ServiceImageOne} alt="Service One" />
            <h3 style={{ color: '#0D1B2A' }}>Small Scale Enterprises</h3> {/* Updated service name */}
            <p style={{ color: '#0D1B2A' }}>Fill the quotation form for further details</p> {/* Example pricing */}
            <p style={{ color: '#0D1B2A' }}>No fixed monthly contracts. Pay only for the time & distance you use.</p>
            <p style={{ color: '#0D1B2A' }}>Get rid of order level payment & reimbursement.</p> 
            <p style={{ color: '#0D1B2A' }}>Pay centrally according to usage.</p>
            
           
            <Button variant="primary" onClick={navigateToBooking}>Get Quotation</Button>
            {/* No need for modal, directly navigate to booking page */}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default MicroServiceEnterprise; // Updated export to reflect new function name
