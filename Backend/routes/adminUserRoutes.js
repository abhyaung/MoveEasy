import express from 'express';
import { LoginAdmin, createAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Route for creating a new admin
router.post('/create-admin', createAdmin);

// Login admin
router.get('/login-admin', LoginAdmin);

export default router;
