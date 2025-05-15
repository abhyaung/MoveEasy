import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompletedDeliveriesForm() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchCompletedBookings();
  }, []);

  const fetchCompletedBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/completed-booking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching completed bookings:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Completed Deliveries</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Recipient Name</th>
            <th>Delivery Address</th>
            <th>Delivery Date</th>
            <th>Status</th> {/* Add Status column header */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((delivery, index) => (
            <tr key={index}>
              <td>{delivery.Bookingid}</td>
              <td>{delivery.Name}</td>
              <td>{`${delivery.DropAddressline1}, ${delivery.Dropcity}, ${delivery.DropZip}`}</td>
              <td>{delivery.createdAt}</td>
              <td>Completed</td> {/* Add Status column with value "Completed" */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedDeliveriesForm;
