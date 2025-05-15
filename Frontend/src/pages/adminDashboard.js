import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCostAdjustment from './AdminCostAdjustment';
import AdminBookingAdjustment from './AdminBookingAdjustment'; // Corrected import name if needed
import AdminDeliveryPartner from './AdminDeliveryPartner';
import AdminUserManager from './AdminUserManager';
import  '../admindashboard.css'
function AdminDashboard() {
    const [activeContent, setActiveContent] = useState('AdminBookingAdjustment');
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(localStorage.getItem('userInfo'));
    //     if (!localStorage.getItem('userInfo')) {
    //       navigate('/Admin-login');
    //     }
    // }, [navigate]); // Added dependency to useEffect

    const handleLinkClick = (content) => {
        setActiveContent(content);
    };

    return (
        <React.Fragment>
            <h1 className='dashboard-heading'>Admin Dashboard</h1>
            <div className="d-basee">
                <div className="d-dashboard-left">
                <div onClick={() => handleLinkClick('AdminBookingAdjustment')} className={activeContent === 'AdminBookingAdjustment' ? 'active' : ''}>
                        Booking Management
                    </div>
                    <div onClick={() => handleLinkClick('AdminUserManager')} className={activeContent === 'AdminUserManager' ? 'active' : ''}>
                        User Management
                    </div>
                    <div onClick={() => handleLinkClick('AdminCostAdjustment')} className={activeContent === 'AdminCostAdjustment' ? 'active' : ''}>
                        Costing
                    </div>
                    <div onClick={() => handleLinkClick('AdminDeliveryPartner')} className={activeContent === 'AdminDeliveryPartner' ? 'active' : ''}>
                        Delivery Account Management
                    </div>
                </div>
                <div className="dashboard-right">
                {activeContent === 'AdminBookingAdjustment' && <AdminBookingAdjustment />}
                    {activeContent === 'AdminUserManager' && <AdminUserManager />}
                    {activeContent === 'AdminCostAdjustment' && <AdminCostAdjustment />}
                    {activeContent === 'AdminDeliveryPartner' && <AdminDeliveryPartner />}
                </div>
            </div>
        </React.Fragment>
    );
}

export default AdminDashboard;