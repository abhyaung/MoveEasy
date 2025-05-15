import express from 'express';
import { getDeliveryPartnerByEmail, createDeliveryPartner, getDeliveryPartners, getDeliveryPartnerById, updateDeliveryPartner, deleteDeliveryPartner, loginDeliveryPartner } from '../controllers/deliveryPartnerController.js';

const router = express.Router();

// Route for creating a new delivery partner
router.post('/deliverypartner', createDeliveryPartner);

router.post('/loginDeliveryPartner', loginDeliveryPartner);

// Route for getting all delivery partners
router.get('/deliverypartner', getDeliveryPartners);

// Route for getting a delivery partner by ID
router.get('/deliverypartner/:id', getDeliveryPartnerById);

// Route for updating a delivery partner
router.put('/deliverypartner/:id', updateDeliveryPartner);

// Route for deleting a delivery partner
router.delete('/deliverypartner/:id', deleteDeliveryPartner);
router.get('/deliverypartner/email/:email', getDeliveryPartnerByEmail);

export default router;
