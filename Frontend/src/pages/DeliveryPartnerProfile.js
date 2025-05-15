import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeliveryPartnerProfile() {
  console.log("hi")
  const [partnerData, setPartnerData] = useState({
    name: '',
    email: '',
    vehicle: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("deliveryUserInfo"));
    console.log(userData);
    if (userData && userData._id) {
      fetchPartner(userData['_id']);
    } else {
      setError('No user data available.');
      setIsLoading(false);
    }
  }, []); 

  const fetchPartner = async (partnerId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/deliverypartner/${partnerId}`);
      if (response.data) {
        setPartnerData({
          name: `${response.data.firstname} ${response.data.lastname}` || 'N/A',
          email: response.data.email || 'N/A',
          vehicle: `${response.data.vehicletype}: ${response.data.vehicleno}` || 'N/A'
        });
      }
    } catch (error) {
      console.error('Error fetching delivery partner data:', error);
      setError('Failed to fetch delivery partner data.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="container mt-3">Loading Profile Details...</div>;
  if (error) return <div className="container mt-3">{error}</div>;

  return (
    <div className="container mt-3">
      <h2>Delivery Partner Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {partnerData.name}</p>
        <p><strong>Email:</strong> {partnerData.email}</p>
        <p><strong>Vehicle:</strong> {partnerData.vehicle}</p>
      </div>
    </div>
  );
}

export default DeliveryPartnerProfile;
