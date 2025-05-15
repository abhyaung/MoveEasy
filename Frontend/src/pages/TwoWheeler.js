import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../TwoWheeler.css'; 
import '../Twowheeleroptions.css';
import ScooterImage from '../assets/scooter.webp';
import CycleImage from '../assets/cycle.webp';
import 'bootstrap/dist/css/bootstrap.min.css';

function TwoWheeler() {
  const navigate = useNavigate();

  // Function to navigate to the booking page or login page based on user authentication
  const navigateToBooking = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      // User is not logged in, navigate to login page
      navigate('/login');
    } else {
      // User is logged in, navigate to booking page
      navigate('/booking');
    }
  };

  return (
    <>
      <div className="sub-header"></div>
      <div className="Twowheeler-options-container">
        <h2 style={{ color: '#0D1B2A', fontSize: '85px' }}>Two Wheelers</h2>
        <div className="options">
          <div className="option-card">
            <img src={CycleImage} alt="Cycle" />
            <h3 style={{ color: '#0D1B2A' }}>Cycle</h3>
            <p style={{ color: '#0D1B2A' }}>Starting from $10/miles</p>
            <p style={{ color: '#0D1B2A' }}>Upto 30 pounds</p>
            <p style={{ color: '#0D1B2A' }}>Box Size - 24inch X 24inch</p>

            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
          <div className="option-card">
            <img src={ScooterImage} alt="Moped" />
            <h3 style={{ color: '#0D1B2A' }}>Moped</h3>
            <p style={{ color: '#0D1B2A' }}>Starting from $15/miles</p>
            <p style={{ color: '#0D1B2A' }}>Upto 50 pounds</p>
            <p style={{ color: '#0D1B2A' }}>Box Size - 30inch X 30inch</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TwoWheeler;
