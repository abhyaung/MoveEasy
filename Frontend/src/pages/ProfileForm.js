import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerProfile() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    address: '',

  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState({});

  useEffect(() => {
    // Fetch customer data for display
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    // console.log("userId", JSON.parse(userId));
    if (userData) {
      setUserId(userData['_id']);
      const temp = userData['_id'];
      fetchCustomer(temp);
    }

    if (userId) {
      fetchCustomer();
    }
  }, [userId]);

  const fetchCustomer = async (userId) => {
    setIsLoading(true);
    if (!userId) {
      return;
    }
    try {
      // Updated URL without '/api' prefix and port set to 3000
      const response = await axios.get(`http://localhost:3001/customers/${userId}`);
      console.log(response);
      setCustomerData({
        name: response.data.firstname + " " + response.data.lastname || 'N/A',
        email: response.data.email,
        address: response.data.Addressline || 'N/A',

      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
      setError('Failed to fetch customer data.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="container mt-3">Profile Details</div>;
  if (error) return <div className="container mt-3">{error}</div>;

  return (
    <div className="container mt-3">
      <h2>Customer Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {customerData.name}</p>

        <p><strong>email:</strong> {customerData.email}</p>
        <p><strong>Address:</strong> {customerData.address}</p>

      </div>
    </div>
  );
}

export default CustomerProfile;
