import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css';
import { ToastContainer, toast } from 'react-toastify';

function AdminLogin() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userDetails = {
            email: email,
            password: password
        }

        // -- You need to remove below code once you integrate login-admin api corrctly 

        localStorage.setItem('adminUserInfo', JSON.stringify(userDetails));
        navigate('/adminDashboard');
        // return;

        //Upto this remove
        try {
            const response = await fetch('http://localhost:3001/login-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                toast.success('Login successfully');
                navigate('/adminDashboard');
                localStorage.setItem('adminUserInfo', JSON.stringify(jsonResponse));
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        }
        catch (error) {

            console.error('Error:', error.message);
            toast.error(error.message);
        }


    };

    // Handle changes for all form inputs using one function

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">{'Login'}</h2>
                    <Form onSubmit={handleSubmit}>
                        {/* Login fields */}
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button
                            type="submit"
                            className="w-100 mb-2"
                            style={{ backgroundColor: 'black', color: 'white' }}
                        >
                            Login As Admin
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

            </Card>
        </Container>
    );
}

export default AdminLogin;
