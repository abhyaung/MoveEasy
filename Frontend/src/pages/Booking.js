import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Booking.css';
import Payment from './Payment.js'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const staticVehicle = ['car', 'moped', 'cycle', 'Truck', 'cybertruck'];
function Booking() {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  // State for each input field
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [email, setEmail] = useState('');
  const [pickupAddressLine1, setPickupAddressLine1] = useState('');
  const [pickupAddressLine2, setPickupAddressLine2] = useState('');
  const [pickupCity, setPickupCity] = useState('');
  const [pickupZip, setPickupZip] = useState('');
  const [dropAddressLine1, setDropAddressLine1] = useState('');
  const [dropAddressLine2, setDropAddressLine2] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [dropZip, setDropZip] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverContactNumber, setReceiverContactNumber] = useState('');
  const [additionalRemarks, setAdditionalRemarks] = useState('');
  const dateTimeString = new Date().toISOString();
  const [selectedOption, setSelectedOption] = useState('');


  // useEffect(() => {
  //   console.log(localStorage.getItem('userInfo'))
  //   if (!localStorage.getItem('userInfo')) {
  //     navigate('/login');
  //   }
  // }, [])

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/vehicles');  // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setVehicles(data);
      } catch (error) {
        console.error('Failed to fetch vehicle types:', error);
        toast.error('Failed to fetch vehicle types.');
      }
    };
  
    fetchVehicleTypes();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingData = {
      Name: name,
      Addressline1: pickupAddressLine1,
      Addressline2: pickupAddressLine2,
      city: pickupCity,
      Zip: pickupZip,
      email: email,
      phoneno: contactNumber,
      ReceiverName: receiverName,
      DropAddressline1: dropAddressLine1,
      DropAddressline2: dropAddressLine2,
      Dropcity: dropCity,
      DropZip: dropZip,
      Receiverphoneno: receiverContactNumber,
      dateTime: new Date(dateTimeString),
      vehicleType: selectedOption,
      status : 'Pending'
    };

    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
        body: JSON.stringify(bookingData), // Convert form data to JSON string
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log(data);
        // Handle successful response
        // toast.success('Booking Confirmed');
        setShowPayment(true);
        navigate('/Payment', { state: { totalPrice: data.booking.totalCost } });
      } else {
        // Handle unsuccessful response
        const errorMessage = await response.text(); // Extract error message from response
        toast.error(errorMessage);
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error.message);
      toast.error(error.message);
    }
  };

  const handlePaymentCompletion = () => {
    // Handle the logic after payment is completed successfully
    setShowPayment(false);
    navigate('/'); // Redirect user to the homepage or booking confirmation page
  };

  return (
    <div className="booking-form google-style" style={{ height: '850px', overflowY: 'auto' }}>
    <h2>Booking Form</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="selectOption">Booking Service</label>
            <select
                className="form-control"
                id="selectOption"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                required
            >
                <option value="">Select an option</option>
                {staticVehicle.map((vehicleType, index) => (
                    <option key={index} value={vehicleType}>
                        {vehicleType}
                    </option>
                ))}
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="contactNumber"
            placeholder="Enter your contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Pickup Address */}
        <div className="form-group">
          <label htmlFor="pickupAddressLine1">Pickup Address Line 1</label>
          <input
            type="text"
            className="form-control"
            id="pickupAddressLine1"
            placeholder="Address line 1"
            value={pickupAddressLine1}
            onChange={(e) => setPickupAddressLine1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickupAddressLine2">Pickup Address Line 2</label>
          <input
            type="text"
            className="form-control"
            id="pickupAddressLine2"
            placeholder="Address line 2"
            value={pickupAddressLine2}
            onChange={(e) => setPickupAddressLine2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickupCity">City</label>
          <input
            type="text"
            className="form-control"
            id="pickupCity"
            placeholder="City"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickupZip">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="pickupZip"
            placeholder="Zip Code"
            value={pickupZip}
            onChange={(e) => setPickupZip(e.target.value)}
            required
          />
        </div>
        {/* Drop-off Address */}
        <div className="form-group">
          <label htmlFor="dropAddressLine1">Drop Address Line 1</label>
          <input
            type="text"
            className="form-control"
            id="dropAddressLine1"
            placeholder="Address line 1"
            value={dropAddressLine1}
            onChange={(e) => setDropAddressLine1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropAddressLine2">Drop Address Line 2</label>
          <input
            type="text"
            className="form-control"
            id="dropAddressLine2"
            placeholder="Address line 2"
            value={dropAddressLine2}
            onChange={(e) => setDropAddressLine2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropCity">City</label>
          <input
            type="text"
            className="form-control"
            id="dropCity"
            placeholder="City"
            value={dropCity}
            onChange={(e) => setDropCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dropZip">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="dropZip"
            placeholder="Zip Code"
            value={dropZip}
            onChange={(e) => setDropZip(e.target.value)}
            required
          />
        </div>
        {/* Additional Fields */}
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group col">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="receiverName">Receiver's Name</label>
          <input
            type="text"
            className="form-control"
            id="receiverName"
            placeholder="Enter receiver's name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="receiverContactNumber">Receiver's Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="receiverContactNumber"
            placeholder="Enter receiver's contact number"
            value={receiverContactNumber}
            onChange={(e) => setReceiverContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="additionalRemarks">Additional Remarks</label>
          <textarea
            className="form-control"
            id="additionalRemarks"
            rows="2"
            placeholder="Enter any additional remarks"
            value={additionalRemarks}
            onChange={(e) => setAdditionalRemarks(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Proceed to Payment</button>
      </form>

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

    </div>
  );
}

export default Booking;
