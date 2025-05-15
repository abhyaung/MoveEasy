import React from 'react';
import '../instant.css'; // Make sure to create this CSS file
import ScooterImage from '../assets/scooter.webp';
import { useNavigate } from 'react-router-dom';

import CycleImage from '../assets/cycle.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Truckoptions.css'; 
import RedImage from '../assets/red.webp';
import TataImage from '../assets/longg.webp';

function Instant() {
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
      <div className="instantsub-header">
      </div>
      <div className="Twowheeler-options-container">
        <h2 style={{ color: '#0D1B2A', fontSize:'70px'}} >Instant Deliveries</h2>
        <div className="options">
          <div className="option-card">
            <img src={CycleImage} alt="2 Wheeler" />
            <h3 style={{ color: '#0D1B2A'}}>Cycle</h3>
            <p style={{ color: '#0D1B2A'}}>Starting from $10/miles</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
          <div className="option-card">
            <img src={ScooterImage} alt="Yamaha" />
            <h3 style={{ color: '#0D1B2A'}}>Moped</h3>
            <p style={{ color: '#0D1B2A'}}>Starting from $15/miles</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
        </div>
      </div>
      <div className="truck-options-container">
        <h2 style={{ color: '#0D1B2A', fontSize:'50px'}}>Rent Mini Trucks</h2>
        <div className="options">
          <div className="option-card">
            <img src={RedImage} alt="4 Wheeler" />
            <h3 style={{ color: '#0D1B2A'}}>Cybertruck</h3>
            <p style={{ color: '#0D1B2A'}}>Starting from $20/miles</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
          <div className="option-card">
            <img src={TataImage} alt="Tata Ace" />
            <h3 style={{ color: '#0D1B2A'}}>Ford F150</h3>
            <p style={{ color: '#0D1B2A'}}>Starting from $30/miles</p>
            <button type="button" className="btn btn-primary" onClick={navigateToBooking}>Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Instant;
