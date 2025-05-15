import React, { useEffect, useState } from 'react';
import '../Dashboard.css';
import ProfileForm from './ProfileForm.js';
import HistoryForm from './HistoryForm.js'; // Update import to use the History component
// import RecentActivityForm from './RecentActivityForm.js';
import Booking from './Booking.js';
import Notifications from './Notifications.js';
import { useNavigate } from 'react-router-dom';
import TransactionHistory from './TransactionHistory.js';


function Dashboard() {
  const [activeContent, setActiveContent] = useState('profile');
  const navigate = useNavigate();

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };

  useEffect(() => {
    console.log(localStorage.getItem('userInfo'))
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [])

  return (
    <div className="basee">
      <div className="dashboard-left">
        <div className="dashboard-heading">
          <h1>Dashboard</h1>
        </div>
        <div onClick={() => handleLinkClick('profile')} className={activeContent === 'profile' ? 'active' : ''}>
          Profile
        </div>
        <div onClick={() => handleLinkClick('history')} className={activeContent === 'history' ? 'active' : ''}>
          History
        </div>
        <div onClick={() => handleLinkClick('notifications')} className={activeContent === 'notifications' ? 'active' : ''}>
          Notifications
        </div>
        <div onClick={() => handleLinkClick('Transaction')} className={activeContent === 'Transaction' ? 'active' : ''}>
          Payment Transaction
        </div>
        <div onClick={() => handleLinkClick('booking')} className={activeContent === 'booking' ? 'active' : ''}>
          Book Now
        </div>

      </div>
      <div className="dashboard-right">
        {activeContent === 'profile' && <ProfileForm />}
        {activeContent === 'history' && <HistoryForm />}
        {activeContent === 'notifications' && <Notifications />}
        {activeContent === 'Transaction' && <TransactionHistory />}
        {activeContent === 'booking' && <Booking />}
      </div>
    </div>
  );
}

export default Dashboard;
