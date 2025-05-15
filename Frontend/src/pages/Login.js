import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [isNewUser, setIsNewUser] = useState(false); // Ensure this toggles based on user's intention

  const toggleIsNewUser = () => setIsNewUser(!isNewUser); // Function to toggle isNewUser state

  useEffect(() => {
    console.log(localStorage.getItem('userInfo'))
    if (localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isNewUser) {
      const customerData = {
        firstname: firstName,
        lastname: lastName,
        Addressline: address,
        email: email,
        password: newPassword,
      }

      try {
        const response = await fetch('http://localhost:3001/customers', { // Replace '/api/customers' with your actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          toast.success('Account created successfully');
          navigate('/dashboard');
          localStorage.setItem('userInfo', JSON.stringify(jsonResponse));
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
      const userDetails = {
        email: email,
        password: password
      }
      try {
        const response = await fetch('http://localhost:3001/loginCustomer', { // Replace '/api/customers' with your actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          toast.success('Login successfully');
          navigate('/');
          localStorage.setItem('userInfo', JSON.stringify(jsonResponse));
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

  // Handle changes for all form inputs using one function

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">{isNewUser ? 'Sign Up' : 'Login'}</h2>
          <Form onSubmit={handleSubmit}>
            {/* Render sign-up or login fields based on isNewUser */}
            {isNewUser ? (
              <>
                {/* Sign-up fields */}
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>
              </>
            ) : (
              <>
                {/* Login fields */}
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
              </>
            )}
            {/* <Button variant="primary" type="submit" className="w-100 mb-2">
              {isNewUser ? 'Sign Up' : 'Login'}
            </Button> */}
            <Button
              type="submit"
              className="w-100 mb-2"
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              {isNewUser ? 'Sign Up' : 'Login'}
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
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <div onClick={toggleIsNewUser} style={{ cursor: 'pointer', color: 'blue' }}>
            {isNewUser ? 'Already have an account? Log In' : 'New user? Sign Up'}
          </div>
          <div className="mt-2">
            Are you a delivery partner? <Link to="/DeliveryPartnerLogin">Sign in here</Link>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Login;
