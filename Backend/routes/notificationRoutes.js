import express from 'express';
import { getNotificationsByUserEmail, createNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications/:email', getNotificationsByUserEmail);
router.post('/notifications', createNotification);

export default router;
