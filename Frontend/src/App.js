import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import CustomerSupport from './pages/CustomerSupport';
import Trucks from './pages/Trucks';
import TwoWheeler from './pages/TwoWheeler';
import PackersMovers from './pages/PackersMovers';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeliveryPartnerLogin from './pages/DeliveryPartnerLogin';
import DeliveryPartnerDashboard from './pages/DeliveryPartnerDashboard';
import TrackPackage from './pages/TrackPackage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsCondition from './pages/TermsCondition';
import Chatbot from './pages/Chatbot';
import ChatbotIcon from './pages/ChatbotIcon';
import Instant from './pages/instant';
import Payment from './pages/Payment';
import QuotationForm from './pages/quotation';
import MicroServiceEnterprise from './pages/MicroServiceEnterprise';
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/adminDashboard';
import AdminCostAdjustment from './pages/AdminCostAdjustment';
import AdminBookingAdjustment from './pages/AdminBookingAdjustment';
import AdminDeliveryPartner from './pages/AdminDeliveryPartner';
import AdminUserManager from './pages/AdminUserManager';
import TransactionHistory from './pages/TransactionHistory.js';


// import { Button, Modal } from 'react-bootstrap';

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const toggleChatbot = () => setShowChatbot(!showChatbot);
  const closeChatbot = () => setShowChatbot(false);
  return (

    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/CustomerSupport" element={<CustomerSupport />} />
          <Route path="/Trucks" element={<Trucks />} />
          <Route path="/TwoWheeler" element={<TwoWheeler />} />
          <Route path="/PackersMovers" element={<PackersMovers />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/DeliveryPartnerLogin" element={<DeliveryPartnerLogin />} />
          <Route path="/DeliveryPartnerDashboard" element={<DeliveryPartnerDashboard />} />
          <Route path="/TrackPackage" element={<TrackPackage />} />
          <Route path="/TermsCondition" element={<TermsCondition />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/instant" element={<Instant />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path='/Quotation' element={<QuotationForm showChatbot={toggleChatbot} />} />
          <Route path='/MicroServiceEnterprise' element={<MicroServiceEnterprise />} />
          <Route path='/AdminCostAdjustment' element={<AdminCostAdjustment />} />
          <Route path='/AdminUserManager' element={<AdminUserManager />} />
          <Route path='AdminDeliveryPartner' element={<AdminDeliveryPartner />} />
          <Route path='/AdminBookingAdjustment' element={<AdminBookingAdjustment />} />
          <Route path='/TransactionHistory' element={<TransactionHistory/>} />

        

          



        </Routes>
        {showChatbot && <Chatbot closeChatbot={() => setShowChatbot(false)} />}
        <ChatbotIcon onClick={toggleChatbot} />
        <ToastContainer />
      </div>
    </Router>

  );
}

export default App;
