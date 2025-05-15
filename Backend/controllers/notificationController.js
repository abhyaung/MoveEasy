import {Notification} from '../models/notification.js';

// Fetch notifications for a specific user email
export const getNotificationsByUserEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const notifications = await Notification.find({ 'recipientEmail': email });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { title, message, recipientEmail, status = 'Pending' } = req.body;
    const newNotification = new Notification({
      title,
      message,
      recipientType: 'Customer',  // Assuming notifications are mainly for customers
      recipientEmail,
      status,
      
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

