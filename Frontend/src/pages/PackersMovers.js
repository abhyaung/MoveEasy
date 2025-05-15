import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../PackersMovers.css'; // Updated CSS file for PackersMovers theme
import '../PackersMoversOptions.css'; // Updated CSS file for options specific to PackersMovers
import PackingImage from '../assets/packerss.jpg'; // Example image for packing services
import MovingImage from '../assets/moverss.jpg'; // Example image for moving services
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PackersMovers() { // Updated function name to reflect PackersMovers theme
  const navigate = useNavigate();

  // Function to handle navigation to booking page
  const handleBookNow = () => {
    // Navigate to the booking page, replace '/booking' with the actual path
    navigate('/quotation');
  };

  return (
    <>
      <div className="packerssub-header"></div>

      <div className="PackersMoversOptions-container">
        <h2 style={{ color: '#0D1B2A', fontSize: '85px' }}>Our Services</h2> {/* Updated heading */}
        <div className="options">
          <div className="option-card">
            <img src={PackingImage} alt="Packing Service" />
            <h3 style={{ color: '#0D1B2A' }}>Packing Services</h3> {/* Updated text */}
            <p style={{ color: '#0D1B2A' }}>Starting from $100</p> {/* Example pricing */}
            <p style={{ color: '#0D1B2A' }}>Labour charges not included*</p>
            
            <Button variant="primary" onClick={handleBookNow}>Get Quotation</Button>
            {/* No need for modal, directly navigate to booking page */}
          </div>
          <div className="option-card">
            <img src={MovingImage} alt="Moving Service" />
            <h3 style={{ color: '#0D1B2A' }}>Moving Services</h3> {/* Updated text */}
            <p style={{ color: '#0D1B2A' }}>Starting from $200</p> {/* Example pricing */}
            <p style={{ color: '#0D1B2A' }}>Labour charges not included*</p>
            <Button variant="primary" onClick={handleBookNow}>Get Quotation</Button>
            {/* No need for modal, directly navigate to booking page */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PackersMovers; // Updated export to reflect new function name
