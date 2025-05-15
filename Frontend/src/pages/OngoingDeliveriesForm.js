import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OngoingDeliveriesForm() {
  const [bookings, setBookings] = useState([]);

  // Remove the useEffect hook that sets up the interval
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchApprovedBookings();
  //   }, 5000); // Polling every 5 seconds

  //   // Clear interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    fetchApprovedBookings(); // Fetch the bookings when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const fetchApprovedBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/approved-booking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };


  const sendNotification = async (booking, action) => {
    const message = action === 'completed'
    ? `Your delivery has been completed.` 
    : `Your delivery is in progress.`;

    await axios.post('http://localhost:3001/notifications', {
      title: `Booking ${action}`,
      message,
      recipientEmail: booking.email,
      status: 'Sent'
    });
  };


  const handleComplete = async (booking) => {
    try {
      const response = await axios.post('http://localhost:3001/complete-booking', { bookingId: booking._id });
      if (response.status === 200) {
        // Successfully completed booking, handle accordingly
        console.log('Booking completed:', booking);
        sendNotification(booking, 'completed'); // Fix function name here
        await fetchApprovedBookings()
      }
    } catch (error) {
      console.error('Error completing booking:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Ongoing Deliveries</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Delivery Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.Bookingid}</td>
              <td>{booking.Name}</td>
              <td>{`${booking.DropAddressline1}, ${booking.Dropcity}, ${booking.DropZip}`}</td>
              <td>{booking.status || 'In Transit'}</td>
              <td>
                <button className="btn btn-success" onClick={() => handleComplete(booking)}>
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OngoingDeliveriesForm;
