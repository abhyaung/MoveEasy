import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminBookingAdjustment() {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleEdit = (booking) => {
    const validDate = new Date(booking.dateTime);
    if (isNaN(validDate.getTime())) {
      console.error('Invalid date from booking:', booking.dateTime);
      booking.dateTime = new Date().toISOString().slice(0, 16);
    } else {
      booking.dateTime = validDate.toISOString().slice(0, 16);
    }
    setEditingBooking(booking);
    setFormData({
      ...booking
    });
    setShowModal(true);
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${bookingId}`);
      fetchBookings();  // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/bookings/${editingBooking._id}`, formData);
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-3">
      <h2>Admin Booking Adjustment</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.Bookingid}</td>
              <td>{booking.Name}</td>
              <td>{booking.email}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(booking)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(booking._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.entries(formData).map(([key, value]) => (
              <Form.Group key={key}>
                <Form.Label>{key.replace(/([A-Z])/g, ' $1').trim()}</Form.Label>
                <Form.Control
                  type={key.includes("email") ? "email" : key.includes("Zip") || key.includes("phoneno") ? "number" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminBookingAdjustment;
