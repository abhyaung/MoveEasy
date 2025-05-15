import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecentActivityForm() {
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Here you would usually fetch the data from your back end
    // For example purposes, we're using static data
    const fetchedActivities = [
      {
        date: '2024-02-18',
        activity: 'Booked a move from New York to Los Angeles',
        details: 'Toyota Camry, Driver: John Doe, Amount: $100'
      },
      {
        date: '2024-02-17',
        activity: 'Changed the move schedule',
        details: 'New date: 2024-02-19, Additional charges: $20'
      },
      {
        date: '2024-02-16',
        activity: 'Cancelled the booking from San Francisco to Seattle',
        details: 'Refund issued: $200'
      }
    ];
    setRecentActivities(fetchedActivities);
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="mt-4 mb-3">Recent Activity</h2>
      {recentActivities.length === 0 ? (
        <p>No recent activity to show.</p>
      ) : (
        <ul className="list-group">
          {recentActivities.map((activity, index) => (
            <li key={index} className="list-group-item">
              <strong>{activity.date}:</strong> {activity.activity}
              <div><small>{activity.details}</small></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivityForm;
