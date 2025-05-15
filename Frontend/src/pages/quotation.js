import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function QuotationForm() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    name: '',
    email: '',
    contactNo: '',
  });

  const [date, setDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted', formData);
    handleModalShow();
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm(); // Reset form fields when modal is closed
  };

  const handleModalShow = () => setShowModal(true);

  const resetForm = () => {
    setFormData({ from: '', to: '', name: '', email: '', contactNo: '' }); // Reset formData state
    setDate('');                     // Reset date state
    setSelectedOption('');           // Reset selected option state
  };

  return (
    <div className='card' style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', boxShadow: '0 0px 2px #0D1B2A' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#0D1B2A' }}>Quotation Form</h2>
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }} htmlFor="selectOption">Service Type</label>
          <select
            className="form-control"
            id="selectOption"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="two-wheeler">Microservice Enterprise</option>
            <option value="truck">Truck</option>
            <option value="packers-movers">Packers Movers</option>
          </select>
        </div>

        <div style={{ display: 'grid', gap: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>Name:</label>
          <input type="text" placeholder='Enter Your Name' name="name" value={formData.name} onChange={handleChange} required style={{ padding: '10px', margin: '5px 0' }} />

          <label style={{ fontWeight: 'bold' }}>Email:</label>
          <input type="email" placeholder='Enter Your Email' name="email" value={formData.email} onChange={handleChange} required style={{ padding: '10px', margin: '5px 0' }} />

          <label style={{ fontWeight: 'bold' }}>Contact No:</label>
          <input type="tel" placeholder='Enter Your Contact Number' name="contactNo" value={formData.contactNo} onChange={handleChange} required style={{ padding: '10px', margin: '5px 0' }} />

          <label style={{ fontWeight: 'bold' }}>Pickup From:</label>
          <input type="text" placeholder='Enter Pickup Address' name="from" value={formData.from} onChange={handleChange} required style={{ padding: '10px', margin: '5px 0' }} />

          <label style={{ fontWeight: 'bold' }}>Drop To:</label>
          <input type="text" placeholder='Enter Drop Address' name="to" value={formData.to} onChange={handleChange} required style={{ padding: '10px', margin: '5px 0' }} />

          <label style={{ fontWeight: 'bold' }}>Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ padding: '10px', margin: '5px 0' }}
          />
        </div>

        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Quotation Sent!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            We will get back to soon via registered email.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
        <button type="submit" style={{ padding: '15px', background: 'var(--dark)', color: 'white', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default QuotationForm;
