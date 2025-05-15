import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import '../Payment.css'; // Assuming the combined CSS is in Payment.css
import axios from 'axios';

const generateOrderId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const ConfirmationPopup = ({ orderId, name, totalPrice }) => (
  <div className="popup">
    <div className="popup-inner">
      <div className="checkmark-circle">
        <div className="background"></div>
        <div className="checkmark draw"></div>
      </div>
      <p style={{ color: 'white' }}>Payment Successful, Your order has been confirmed!</p>
      <p style={{ color: 'white' }}>Order ID: {orderId}</p>
      <p style={{ color: 'white' }}>Name: {name}</p>
      <p style={{ color: 'white' }}>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  </div>
);

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0; // Receive totalPrice from navigate state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [orderId, setOrderId] = useState(generateOrderId());
  const [showModal, setShowModal] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
    navigate('/');
  };

  // Function to post payment details to the server
  const submitPayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/payments', {
        totalCost: totalPrice, 
        name: cardName,
        cardNumber, // Make sure you handle the card number securely
        expiryDate: expDate,
        orderId,
        cvv, // Never log CVV, just for demonstration purposes
        // Include totalPrice, orderid, and Bookingid as per your schema if needed
      });

      if (response.status === 201) {
        console.log('Payment successfully processed', response.data);
        // You might want to navigate to a success page or perform other actions here
        setShowModal(true);
      }
    } catch (error) {
      console.error('There was an error processing the payment', error);
      // Handle error feedback to the user here
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the default form submission
    submitPayment();
  };

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      localStorage.removeItem('deliveryUserInfo');
      localStorage.removeItem('adminUserInfo');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form>
                  <h1 className="mb-4">Payment</h1>
                  <div className="mb-3">
                    <label htmlFor="totalPrice" className="form-label">Total Price</label>
                    <input type="text" value={`$${totalPrice}`} className="form-control" id="totalPrice" readOnly />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardName" className="form-label">Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="form-control"
                      id="cardName"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="form-control" id="cardNumber" placeholder="Enter card number" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input value={expDate} onChange={(e) => setExpDate(e.target.value)} type="text" className="form-control" id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} className="form-control" id="cvv" placeholder="Enter CVV" required />
                  </div>
                  <button className="btn btn-primary" onClick={handleClick}>Complete Order</button>
                </form>
                <Modal show={showModal} onHide={handleModalClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Order Confirmed!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <span>Order created with OrderId: {orderId}</span>
                    <br></br>
                    <span>Name: {cardName}</span>
                    <br></br>
                    <span>TotalPrice: {totalPrice}</span>
                    <br></br>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                {isPopupVisible && <ConfirmationPopup orderId={orderId} name={cardName} totalPrice={totalPrice} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;