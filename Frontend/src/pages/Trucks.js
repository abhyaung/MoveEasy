import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Trucks.css';
import '../Truckoptions.css';
import RedImage from '../assets/truckkk.jpg';
import TataImage from '../assets/longg.avif';
import 'bootstrap/dist/css/bootstrap.min.css';

function Trucks() {
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
      <div className="truckssub-header">
      </div>
      <div className="truck-options-container">
        <h2 style={{ color: '#0D1B2A', fontSize: '85px' }}>Rent Mini Trucks</h2>
        <div className="options">
          <div className="option-card">
            <img src={RedImage} alt="4 Wheeler" />
            <h3 style={{ color: '#0D1B2A' }}>Cybertruck</h3>
            <p style={{ color: '#0D1B2A' }}>Starting from $30/miles</p>
            <p style={{ color: '#0D1B2A' }}>Upto 3300 pounds</p>
            <p style={{ color: '#0D1B2A' }}>Box Size - 96inch X 72inch</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
          <div className="option-card">
            <img src={TataImage} alt="Tata Ace" />
            <h3 style={{ color: '#0D1B2A' }}>Ford F150</h3>
            <p style={{ color: '#0D1B2A' }}>Starting from $20/miles</p>
            <p style={{ color: '#0D1B2A' }}>Upto 1200 pounds</p>
            <p style={{ color: '#0D1B2A' }}>Box Size - 60inch X 60inch</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trucks;
