import React, { useEffect, useState } from 'react';
import '../Home.css';
import { Card, Button, Container, Row, Col, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

// Import your images
import bikeImage from '../assets/2Wheeler.webp';
import instantImage from '../assets/instamnt.webp';
import trucksImage from '../assets/4Wheelr.webp';
import packersImage from '../assets/packres.webp';
import enterprisesImage from '../assets/enterp.webp';
import quotationImage from '../assets/quotation.webp'; // Path to your quotation image

const TwoWheelerCard = () => (
  <Card>
    <Card.Img variant="top" src={bikeImage} />
    <Card.Body className="text-center">
     
        <Card.Title>Two Wheeler</Card.Title>
      
      <Link to="/TwoWheeler">
        <Button variant='dark'>Know more</Button>
      </Link>
    </Card.Body>
  </Card>
);

const TrucksCard = () => (
  <Card>
    <Card.Img variant="top" src={trucksImage} />
    <Card.Body className="text-center">
     
        <Card.Title>Trucks</Card.Title>
      
      <Link to="/Trucks">
        <Button variant='dark'>Know more</Button>
      </Link>
    </Card.Body>
  </Card>
);

const PackersMoversCard = () => (
  <Card>
    <Card.Img variant="top" src={packersImage} />
    <Card.Body className="text-center">
     
        <Card.Title>Packers & Movers</Card.Title>
     
      <Link to="/PackersMovers">
        <Button variant='dark'>Know more</Button>
      </Link>
    </Card.Body>
  </Card>
);

const InstantCard = () => (
  <Card>
    <Card.Img variant="top" src={instantImage} />
    <Card.Body className="text-center">
      
        <Card.Title>Instant</Card.Title>
     
      <Link to="/Instant">
        <Button variant='dark'>Know more</Button>
      </Link>
    </Card.Body>
  </Card>
);

const MicroServiceEnterpriseCard = () => (
  <Card>
    <Card.Img variant="top" src={enterprisesImage} />
    <Card.Body className="text-center">
     
        <Card.Title>Micro Service Enterprise</Card.Title>
      
      <Link to="/MicroServiceEnterprise">
        <Button variant='dark'>Know more</Button>
      </Link>
    </Card.Body>
  </Card>
);

const QuotationCard = () => (
  <Card>
    <Card.Img variant="top" src={quotationImage} />
    <Card.Body className="text-center">
      
        <Card.Title>Quotation</Card.Title>
     
      <Link to="/Quotation">
        <Button variant='dark'>Know more</Button>
      </Link>
    </Card.Body>
  </Card>
);

function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [activeModal, setActiveModal] = useState(null);

  const handleSelect = (eventKey) => setSelectedCity(eventKey);
  const handleShow = (modalKey) => setActiveModal(modalKey);
  const handleBookNow = () => navigate('/Booking');

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, [])

  return (
    <div className='homebody'>
      <h1 style={{ textAlign: 'center', color: '#0D1B2A', fontSize: '50px' }}>Moving America Forward: Logic Meets Logistics!</h1>
      <Dropdown className="d-flex justify-content-center my-3" onSelect={handleSelect}>
        <DropdownButton id="dropdown-basic-button" title={selectedCity}>
          {['New York', 'Boston', 'Connecticut', 'Jersey City', 'Edison', 'Hoboken', 'Queens', 'Brooklyn'].map(city => (
            <Dropdown.Item eventKey={city} key={city}>{city}</Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>
      <Container className="my-5">
        <Row>
          <Col md={4} className="mb-4">
            <TwoWheelerCard />
          </Col>
          <Col md={4} className="mb-4">
            <TrucksCard />
          </Col>
          <Col md={4} className="mb-4">
            <PackersMoversCard />
          </Col>
          <Col md={4} className="mb-4">
            <InstantCard />
          </Col>
          <Col md={4} className="mb-4">
            <MicroServiceEnterpriseCard />
          </Col>
          <Col md={4} className="mb-4">
            <QuotationCard />
          </Col>
        </Row>
      </Container>
      {/* Footer */}
      <Container fluid className="footer mt-5 pt-4 pb-2 text-light">
        <Row className="justify-content-center">
          <Col md={3} className="text-center mb-3" >
            <h5 style={{ color: '#0D1B2A', fontSize: '30px' }}>MoveEasy</h5>
            <p style={{ color: '#F5F5DC' }}>Send anything, anywhere, anytime</p>
          </Col>
          <Col md={3} className="text-center mb-3" style={{ color: '#F5F5DC' }}>
            <h5 style={{ color: '#0D1B2A', fontSize: '30px' }}>We are here</h5>
            <ul className="list-unstyled" style={{ color: '#F5F5DC' }}>
              <li>New York</li>
              <li>Boston</li>
              <li>Connecticut</li>
              <li>Jersey</li>
              <li>Edison</li>
            </ul>
          </Col>
          <Col md={3} className="text-center mb-3" style={{ color: '#F5F5DC' }}>
            <h5 style={{ color: '#0D1B2A', fontSize: '30px' }}>Company</h5>
            <ul className="list-unstyled" style={{ color: '#F5F5DC' }}>
              <li style={{ cursor: "pointer" }} onClick={() => navigate('/About')}>About Us</li>
              <li style={{ cursor: "pointer" }} onClick={() => navigate('/CustomerSupport')}>FAQ</li>
            </ul>
          </Col>
          <Col md={3} className="text-center mb-3" style={{ color: '#F5F5DC' }}>
            <h5 style={{ color: '#0D1B2A', fontSize: '30px' }}>Support</h5>
            <ul className="list-unstyled" style={{ color: '#F5F5DC' }}>
              <li style={{ cursor: "pointer" }} onClick={() => navigate('/CustomerSupport')}>Customer Support</li>
              <li style={{ cursor: "pointer" }} onClick={() => navigate('/PrivacyPolicy')}>Privacy Policy</li>
              <li style={{ cursor: "pointer" }} onClick={() => navigate('/TermsCondition')}>Terms of Service</li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4" style={{ color: '#F5F5DC' }}>
          <Col md={6} className="text-center" style={{ color: '#F5F5DC' }}>
            <p style={{ color: '#0D1B2A', fontSize: '30px' }}>&copy; 2024 MoveEasy. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
