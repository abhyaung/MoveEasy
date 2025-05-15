import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

function AdminCostAdjustment() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    vehicletype: '',
    pricing: ''
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleEdit = (vehicle) => {
    setFormData({
      vehicletype: vehicle.vehicletype,
      pricing: vehicle.pricing.toString()
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/vehicles/pricing`, formData);
      if (response.status === 200) {
        fetchVehicles();  // Refresh the list to show updated data
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-3">
      <h2>Admin Cost Adjustment</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Pricing</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td>{vehicle.vehicletype}</td>
              <td>{vehicle.pricing}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(vehicle)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vehicle Pricing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Vehicle Type</Form.Label>
              <Form.Control
                type="text"
                name="vehicletype"
                value={formData.vehicletype}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pricing</Form.Label>
              <Form.Control
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
              />
            </Form.Group>
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

export default AdminCostAdjustment;
