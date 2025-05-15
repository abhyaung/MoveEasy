import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function History() {
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData) {
      setLoggedInUserEmail(userData['email']);
      fetchBookings(userData['email']);
    }
  }, []);

  // const fetchBookings = async (customerEmail) => {
  //   setIsLoading(true);
  //   if (!customerEmail) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(`http://localhost:3001/bookings/customers/${customerEmail}`);
  //     console.log(response.data);
  //     setBookingData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching booking data:', error);
  //     setError('Failed to fetch booking data.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const fetchBookings = async (customerEmail) => {
    setIsLoading(true);
    if (!customerEmail) {
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/bookings/customers/${customerEmail}`);
      console.log(response.data);
      // Sort the bookings by the createdAt field in descending order
      const sortedBookings = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookingData(sortedBookings);
    } catch (error) {
      console.error('Error fetching booking data:', error);
      setError('Failed to fetch booking data.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="container mt-3">Loading...</div>;
  if (error) return <div className="container mt-3">{error}</div>;

  return (
    <div className="container mt-3">
      <h2>Booking History</h2>
      {bookingData.length === 0 ? (
        <p>No bookings found in your history.</p>
      ) : (
        <ul className="list-group">
          {bookingData.map((booking, index) => (
            <li key={index} className="list-group-item">
              <p><strong>Name:</strong> {booking.Name}</p>
              <p><strong>Addressline1:</strong> {booking.Addressline1}</p>
              <p><strong>Addressline2:</strong> {booking.Addressline2}</p>
              <p><strong>City:</strong> {booking.city}</p>
              <p><strong>Zip:</strong> {booking.Zip}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone Number:</strong> {booking.phoneno}</p>
              <p><strong>Receiver Name:</strong> {booking.ReceiverName}</p>
              <p><strong>Drop Addressline1:</strong> {booking.DropAddressline1}</p>
              <p><strong>Drop City:</strong> {booking.Dropcity}</p>
              <p><strong>Drop Zip:</strong> {booking.DropZip}</p>
              <p><strong>Receiver Phone Number:</strong> {booking.Receiverphoneno}</p>
        
              <p><strong>Booking ID:</strong> {booking.Bookingid}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;