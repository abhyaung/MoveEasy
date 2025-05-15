import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function DeliveryPartnerManager() {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get('http://localhost:3001/deliverypartner');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching delivery partners:', error);
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      firstname: partner.firstname,
      lastname: partner.lastname,
      email: partner.email,
      phoneno: partner.phoneno,
      vehicleno: partner.vehicleno,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/deliverypartner/${editingPartner._id}`, formData);
      setEditingPartner(null);
      setShowModal(false);
      fetchPartners();
    } catch (error) {
      console.error('Error updating delivery partner:', error);
    }
  };

  const handleDelete = async (partnerId) => {
    try {
      await axios.delete(`http://localhost:3001/deliverypartner/${partnerId}`);
      fetchPartners();
    } catch (error) {
      console.error('Error deleting delivery partner:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingPartner(null);
  };

  return (
    <div className="container mt-3">
      <h2>Delivery Partner Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner._id}>
              <td>{`${partner.firstname} ${partner.lastname}`}</td>
              <td>{partner.email}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEdit(partner)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(partner._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Delivery Partner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.entries(formData).map(([key, value]) => (
              <Form.Group key={key}>
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type={key === 'email' ? 'email' : key === 'phoneno' ? 'tel' : 'text'}
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
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeliveryPartnerManager;
