import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notifications() {
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // const fetchNotifications = async (email) => {
    //   try {
    //     const response = await axios.get(`http://localhost:3001/notifications/${email}`);
    //     if (response.data && response.data.length === 0) {
    //       setError('No notifications found.');
    //       setNotificationData([]); // Ensure data is cleared if no notifications are found
    //     } else {
    //       setNotificationData(response.data);
    //       setError(''); // Clear any existing error messages
    //     }
    //   } catch (error) {
    //     console.error('Error fetching notification data:', error);
    //     setError('Failed to fetch notification data.');
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    const fetchNotifications = async (email) => {
      try {
        const response = await axios.get(`http://localhost:3001/notifications/${email}`);
        if (response.data && response.data.length === 0) {
          setError('No notifications found.');
          setNotificationData([]); // Ensure data is cleared if no notifications are found
        } else {
          const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNotificationData(sortedData);
          setError(''); // Clear any existing error messages
        }
      } catch (error) {
        console.error('Error fetching notification data:', error);
        setError('Failed to fetch notification data.');
      } finally {
        setIsLoading(false);
      }
    };
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData && userData.email) {
      const interval = setInterval(() => {
        fetchNotifications(userData.email);
      }, 1000); // Poll every 5 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    } else {
      setIsLoading(false);
      setError('User data is not available.');
    }
  }, []);

  if (isLoading) {
    return <div className="container mt-3">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-3">{error}</div>;
  }

  return (
    <div className="container mt-3">
      <h2>Notifications</h2>
      {notificationData.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="list-group">
          {notificationData.map((notification, index) => (
            <li key={index} className="list-group-item">
              <p><strong>Title:</strong> {notification.title}</p>
              <p><strong>Message:</strong> {notification.message}</p>
              {/* <p><strong>Status:</strong> {notification.status}</p> */}
              <p><strong>Date:</strong> {new Date(notification.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
