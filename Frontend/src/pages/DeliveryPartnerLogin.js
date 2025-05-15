import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../DeliveryPartnerLogin.css'; 
import { ToastContainer, toast } from 'react-toastify';

function DeliveryPartnerLogin() {
  const navigate = useNavigate();
  const [isNewDeliveryPartner, setIsNewDeliveryPartner] = useState(false);

  // States for both sign in and sign up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Additional states for sign up
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState(''); // State for vehicle type
  const [phone, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isNewDeliveryPartner) {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      console.log('Sign up logic for new delivery partner', { firstName, lastName, email, password, licenseNumber, vehicleNumber, vehicleType });

      const deliveryData = {
        firstname: firstName,
        lastname: lastName,
        licenseno: licenseNumber,
        vehicleno: vehicleNumber,
        vehicletype: vehicleType, // Including vehicle type in the data sent to server
        email: email,
        password: password,
        phoneno: phone
      };

      try {
        const response = await fetch('http://localhost:3001/deliverypartner', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deliveryData),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          toast.success('Delivery Partner Account created successfully');
          navigate('/DeliveryPartnerDashboard');
          localStorage.setItem('deliveryUserInfo', JSON.stringify(jsonResponse));
        } else {
          const errorMessage = await response.text(); // Extract error message from response
          toast.error(errorMessage);
        }
      }
      catch (error) {
        // Handle error
        console.error('Error:', error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } else {
      console.log('Sign in logic for existing delivery partner', { email, password });
      const userDetails = {
        email: email,
        password: password
      }
      try {
        const response = await fetch('http://localhost:3001/loginDeliveryPartner', { // Replace '/api/customers' with your actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          toast.success('Login successfully');
          navigate('/DeliveryPartnerDashboard');
          localStorage.setItem('deliveryUserInfo', JSON.stringify(jsonResponse));
        } else {
          const errorMessage = await response.text(); // Extract error message from response
          toast.error(errorMessage);
        }
      }
      catch (error) {
        // Handle error
        console.error('Error:', error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center">{isNewDeliveryPartner ? 'Delivery Partner Sign Up' : 'Delivery Partner Login'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            {isNewDeliveryPartner && (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="select" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
                    <option value="">Select Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="moped">Moped</option>
                    <option value="cycle">Cycle</option>
                    <option value="truck">Truck</option>
                    <option value="cybertruck">Cybertruck</option>
                  </Form.Control>
                </Form.Group>
              </>
            )}
            {!isNewDeliveryPartner && (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Button
              type="submit"
              className="w-100 mb-2"
              style={{ backgroundColor: 'black', color: 'white' }}>
              {isNewDeliveryPartner ? 'Sign Up' : 'Login'}
            </Button>
          </Form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="text-center">
            <a href="#" onClick={() => setIsNewDeliveryPartner(!isNewDeliveryPartner)} style={{ color: 'blue', cursor: 'pointer' }}>
              {isNewDeliveryPartner ? 'Already have an account? Sign in' : 'New delivery partner? Sign up here'}
            </a>
            <div className="mt-2">
              Are you a Customer ? <Link to="/Login">Sign in here</Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DeliveryPartnerLogin;
