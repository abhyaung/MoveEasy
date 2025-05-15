import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PendingRequestsForm({ setDeliveryData }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pending-booking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  const sendNotification = async (bookings, action) => {
    const message = action === 'approved' 
      ? `Your order has been pickedup by delivery partner` 
      : `Your booking has been rejected.`;
  
    await axios.post('http://localhost:3001/notifications', {
      title: `Booking ${action}`,
      message,
      recipientEmail: bookings.email,
      status: 'Sent'
    });
  };

  // const handleApprove = async (booking) => {
  //   try {
  //     const response = await axios.post('http://localhost:3001/approve-booking', { bookingId: booking._id });
  //     if (response.status === 200) {
  //       // Spread the response.data if it's an array, or wrap it if it's an object
  //       const newData = Array.isArray(response.data) ? [...response.data] : [response.data];
  //       setDeliveryData(prevDeliveries => [...prevDeliveries, ...newData]);
  //     }
  //   } catch (error) {
  //     console.error('Error approving booking:', error);
  //   }
  // };

  // const handleReject = (bookingId) => {
  //   // Filter out the booking with the matching bookingId
  //   setBookings(currentBookings => currentBookings.filter(booking => booking._id !== bookingId));
  // };
  const handleApprove = async (booking) => {
    try {
      const response = await axios.post('http://localhost:3001/approve-booking', { bookingId: booking._id });
      if (response.status === 200) {
        // Assuming response.data returns updated bookings
        const newData = Array.isArray(response.data) ? [...response.data] : [response.data];
        setDeliveryData(prevDeliveries => [...prevDeliveries, ...newData]);
        sendNotification(booking, 'approved'); // Send notification for approval
        await fetchPendingBookings();
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };
  
  // const handleReject = async (booking) => {
  //   try {
  //     const response = await axios.post('http://localhost:3001/rejected-booking', { bookingId: booking._id });
  //     if (response.status === 200) {
  //       setBookings(currentBookings => currentBookings.filter(booking => booking._id !== response.data._id));
  //       sendNotification(booking, 'rejected'); // Send notification for rejection
  //     }
  //   } catch (error) {
  //     console.error('Error rejecting booking:', error);
  //   }
  // };
    const handleReject = (bookingId) => {
    // Filter out the booking with the matching bookingId
    setBookings(currentBookings => currentBookings.filter(booking => booking._id !== bookingId));
  };

  return (
    <div className="container mt-3">
      <h2>Pending Bookings</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Name</th>
            <th>Delivery Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.Bookingid}</td>
              <td>{booking.Name}</td>
              <td>{`${booking.DropAddressline1}, ${booking.Dropcity}, ${booking.DropZip}`}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleApprove(booking)}>
                  Approve
                </button>
                <button className="btn btn-danger" onClick={() => handleReject(booking._id)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingRequestsForm;
