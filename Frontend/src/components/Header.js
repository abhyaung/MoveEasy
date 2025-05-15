import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import Logo from '../assets/logo.jpg';
import { Card, Button, Container, Row, Col, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';



   
 
function Header() {
    const [userData, setUserData] = useState({});
    const [DeliveryUserData, setDeliveryUserData] = useState({});
    const [adminUserData, setadminUserData] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const handleSelect = (eventKey) => {
        if (eventKey === 'Dashboard') {
            navigate('/dashboard');
        } else if (eventKey === 'Logout') {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('deliveryUserInfo');
            navigate('/login');
        }
    }

    const handleSelectAdmin = (eventKey) => {
        if (eventKey === 'Dashboard') {
            navigate('/adminDashboard');
        } else if (eventKey === 'Logout') {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('adminUserInfo');
            navigate('/admin-login');
        }
    }

    const handleSelectdrop = (eventKey) => {
        if (eventKey === 'Profile') {
            navigate('/DeliveryPartnerDashboard');
        } else if (eventKey === 'Logout') {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('deliveryUserInfo');
            navigate('/DeliveryPartnerLogin');
        }
    }
   
    useEffect(() => {
        const userDataItems = JSON.parse(localStorage.getItem("userInfo"));
        if (userDataItems) {
            setUserData(userDataItems);
        } else {
            setUserData(null);
        }

        const deliveryUserData = JSON.parse(localStorage.getItem("deliveryUserInfo"));
        if (deliveryUserData) {
            setDeliveryUserData(deliveryUserData)
        } else {
            setDeliveryUserData(null)
        }

        const adminUserData = JSON.parse(localStorage.getItem("adminUserInfo"));
        if (adminUserData) {
            setadminUserData(adminUserData)
        } else {
            setadminUserData(null)
        }

    }, [location.pathname])

    return (
        <nav className='nav'>
            <div className="nav-links">
                <a className="nav-link" href="/" style={{ color: '#F5F5DC' }}>
                    <img src={Logo} height="30px" width="125px" />
                </a>
                <a className="nav-link" href="/TrackPackage" style={{ color: '#F5F5DC' }}>TrackPackage</a>
                <a className="nav-link" href="/Login" style={{ color: '#F5F5DC' }}>Login</a>
                <a className="nav-link" href="/customersupport" style={{ color: '#F5F5DC' }}>Support</a>
                


            </div>
            {userData &&
                <div className="user-info" style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
                    <img src="https://www.gravatar.com/avatar/34095df106b8ee08c928802c78eee85d?d=identicon" alt="User Avatar"
                        className="rounded-circle" style={{ width: '30px', height: '30px', marginRight: 10 }} />
                    <Dropdown className="d-flex justify-content-center my-3" onSelect={handleSelect}>
                        <DropdownButton id="dropdown-basic-button" title={userData.firstname + " " + userData.lastname}>
                            {['Dashboard', 'Logout'].map(city => (
                                <Dropdown.Item eventKey={city} key={city}>{city}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Dropdown>
                </div>
            }

            {DeliveryUserData &&
                <div className="user-info" style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
                    <img src="https://www.gravatar.com/avatar/34095df106b8ee08c928802c78eee85d?d=identicon" alt="User Avatar"
                        className="rounded-circle" style={{ width: '30px', height: '30px', marginRight: 10 }} />
                    <Dropdown className="d-flex justify-content-center my-3" onSelect={handleSelectdrop}>
                        <DropdownButton id="dropdown-basic-button" title={DeliveryUserData.firstname + " " + DeliveryUserData.lastname}>
                            {['Profile','Logout'].map(city => (
                                <Dropdown.Item eventKey={city} key={city}>{city}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Dropdown>
                </div>
            }

            {adminUserData &&
                <div className="user-info" style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
                    <img src="https://www.gravatar.com/avatar/34095df106b8ee08c928802c78eee85d?d=identicon" alt="User Avatar"
                        className="rounded-circle" style={{ width: '30px', height: '30px', marginRight: 10 }} />
                    <Dropdown className="d-flex justify-content-center my-3" onSelect={handleSelectAdmin}>
                        <DropdownButton id="dropdown-basic-button" title={"ADMIN"}>
                            {['Dashboard','Logout'].map(city => (
                                <Dropdown.Item eventKey={city} key={city}>{city}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Dropdown>
                </div>
            }        


        </nav >
    );
}

export default Header;
