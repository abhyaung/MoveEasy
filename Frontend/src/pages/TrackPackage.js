import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function TrackPackage() {
    const [bookingId, setBookingId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const dix = {
        'Approved':'In Trasit',
        'Completed':'Delivered',
        'Pending':'Pending'
    }

    const handleTrack = async (e) => {
        e.preventDefault();
        setTrackingResult(null);
        setErrorMessage('');

        if (!bookingId) {
            setErrorMessage("Please enter a valid Booking ID.");
            return;
        }

        try {
            // Dynamically build the URL with the bookingId
            const url = `http://localhost:3001/bookings/book/${bookingId}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch booking details");
            }

            // Map the server's booking status to user-friendly text
            let displayStatus = 'Pending';
            switch(data.status) {
                case 'Approved':
                    displayStatus = 'In Transit';
                    break;
                case 'Completed':
                    displayStatus = 'Delivered';
                    break;
                case 'Rejected':
                    displayStatus = 'Rejected';
                    break;

                default:
                    displayStatus = data.status; // Use server-provided status if unhandled
            }

            setTrackingResult({
                status: displayStatus,
                details: data[0]
            });
            console.log(trackingResult)
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} lg={6}>
                    <Form onSubmit={handleTrack}>
                        <Form.Group className="mb-3" controlId="bookingId">
                            <Form.Label>Enter Booking ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Booking ID"
                                value={bookingId}
                                onChange={(e) => setBookingId(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Track Booking
                        </Button>
                    </Form>
                    {trackingResult && (
                        <Alert variant="success" className="mt-3">
                            <p>Status: {dix[trackingResult.details.status]}</p>
                            <p>Booking ID: {trackingResult.details.Bookingid}</p>
                            <p>Customer Name: {trackingResult.details.Name}</p>
                            <p>Delivery Address: {`${trackingResult.details.DropAddressline1}, ${trackingResult.details.Dropcity}, ${trackingResult.details.DropZip}`}</p>
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default TrackPackage;
