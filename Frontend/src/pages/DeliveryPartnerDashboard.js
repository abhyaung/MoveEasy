import React, { useState } from 'react';
import PendingRequestsForm from './PendingRequestsForm';
import OngoingDeliveriesForm from './OngoingDeliveriesForm';
import CompletedDeliveriesForm from './CompletedDeliveriesForm'; // Assuming you also have this component
import DeliveryPartnerProfile from './DeliveryPartnerProfile';



function DeliveryPartnerDashboard() {
  const [activeContent, setActiveContent] = useState('Profile');
  const [deliveryData, setDeliveryData] = useState([]);
  

  // Function to update delivery data by appending new data
  const updateDeliveryData = (newData) => {
    setDeliveryData(prevData => [...prevData, newData]);  // Append new data to existing array
  };

  const handleLinkClick = (content) => {
    setActiveContent(content);
  };
  console.log('Delivery Data:', deliveryData);
  return (
    <div className="base">
      <div className="dashboard-left">
      <button onClick={() => handleLinkClick('Profile')} className={activeContent === 'Profile' ? 'active' : ''}>
          Profile
        </button>
        <button onClick={() => handleLinkClick('pendingRequests')} className={activeContent === 'pendingRequests' ? 'active' : ''}>
          Pending Requests
        </button>
        <button onClick={() => handleLinkClick('ongoingDeliveries')} className={activeContent === 'ongoingDeliveries' ? 'active' : ''}>
          Ongoing Deliveries
        </button>
        <button onClick={() => handleLinkClick('completedDeliveries')} className={activeContent === 'completedDeliveries' ? 'active' : ''}>
          Completed Deliveries
        </button>

        

      </div>
      <div className="dashboard-right">
      {activeContent === 'Profile' && (
          <DeliveryPartnerProfile />  // Assuming you have implemented this
        
        )}
        {activeContent === 'pendingRequests' && (
          <PendingRequestsForm setDeliveryData={updateDeliveryData} />
        )}
        {activeContent === 'ongoingDeliveries' && (
          <OngoingDeliveriesForm deliveries={deliveryData} />
        )}
        {activeContent === 'completedDeliveries' && (
          <CompletedDeliveriesForm />  // Assuming you have implemented this
        )}
        

      </div>
    </div>
  );
}

export default DeliveryPartnerDashboard;
